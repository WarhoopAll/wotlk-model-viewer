const _cache = new Map()

const _baseUrl = () => window.CONTENT_PATH || '/data/'
const _urlFor = (id) => _baseUrl() + 'mo3/' + id + '.mo3'

// Off-main-thread decompression. Lazily imported so a worker-unsupported
// environment never pays the import cost and just uses the engine's inflate.
let _inflateMo3 = null
async function decompressOffThread(buffer) {
    try {
        if (!_inflateMo3) {
            const mod = await import('./inflate-worker-pool.js')
            mod.installInflateHook()
            _inflateMo3 = mod.inflateMo3
        }
        return await _inflateMo3(buffer)
    } catch (e) {
        window.WH?.debug(`[MO3-CACHE] worker inflate unavailable, keeping raw buffer: ${e}`)
        return buffer
    }
}

/**
 * Patches XMLHttpRequest (the transport the engine actually uses internally —
 * see `new XMLHttpRequest` in vendor/viewer.min.js) so any .mo3 present in the
 * cache is served from memory without hitting the network.
 *
 * This replaces the previous jQuery.ajax monkey-patch: it is transport-level
 * (works regardless of how the engine calls $.ajax), and it correctly fills in
 * the `responseURL` field the engine reads back via `renderer.downloads`.
 *
 * Returns true if the patch was applied (or already present).
 */
function patchAjax() {
    if (typeof XMLHttpRequest === 'undefined') return false
    if (XMLHttpRequest.prototype.__mo3Patched) return true
    XMLHttpRequest.prototype.__mo3Patched = true

    const origOpen = XMLHttpRequest.prototype.open
    const origSend = XMLHttpRequest.prototype.send

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this.__mo3Url = url
        return origOpen.call(this, method, url, ...rest)
    }

    XMLHttpRequest.prototype.send = function (body) {
        const url = this.__mo3Url || ''
        if (url.includes('.mo3') && _cache.has(url)) {
            const data = _cache.get(url)
            window.WH?.debug(`[MO3-CACHE] HIT: ${url.replace(/^.*\/mo3\//, 'mo3/')} (${(data.byteLength / 1024).toFixed(0)}KB)`)

            // Emulate a completed binary XHR response. The engine reads
            // `response` (arraybuffer), `responseURL`, `status`, `readyState`
            // and fires onprogress/onload/onreadystatechange.
            const define = (key, value) => Object.defineProperty(this, key, {
                value, configurable: true, writable: true
            })
            define('readyState', 4)
            define('status', 200)
            define('statusText', 'OK')
            define('response', data)
            define('responseURL', url)
            define('responseText', null)

            const self = this
            queueMicrotask(() => {
                self.onreadystatechange?.()
                self.onprogress?.({
                    lengthComputable: true,
                    loaded: data.byteLength,
                    total: data.byteLength
                })
                self.onload?.()
            })
            return
        }
        return origSend.call(this, body)
    }

    window.WH?.debug('[MO3-CACHE] XHR patched')
    return true
}

/**
 * Preloads the given .mo3 ids into the in-memory cache.
 * Skips ids that are already cached. Failures are reported but never reject
 * the returned promise (allSettled semantics) so a single 404 doesn't block
 * the viewer.
 *
 * @param {Array<string|number>} ids
 * @returns {Promise<void>}
 */
async function preload(ids) {
    patchAjax()
    const toFetch = ids.filter(id => !_cache.has(_urlFor(id)))
    if (toFetch.length === 0) {
        window.WH?.debug(`[MO3-CACHE] All ${ids.length} MO3 files already cached`)
        return
    }

    window.WH?.debug(`[MO3-CACHE] Preloading ${toFetch.length} MO3 files...`)
    const results = await Promise.allSettled(
        toFetch.map(async (id) => {
            const url = _urlFor(id)
            const resp = await fetch(url)
            if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${url}`)
            const raw = await resp.arrayBuffer()
            // Decompress on a worker thread NOW so the engine can skip its
            // synchronous inflate later. Falls back to the raw buffer if no
            // worker is available (engine handles it itself).
            const buf = await decompressOffThread(raw)
            _cache.set(url, buf)
            return { id, size: raw.byteLength }
        })
    )
    const ok = results.filter(r => r.status === 'fulfilled').length
    const totalSize = results
        .filter(r => r.status === 'fulfilled')
        .reduce((s, r) => s + r.value.size, 0)
    window.WH?.debug(`[MO3-CACHE] Preloaded ${ok}/${toFetch.length} MO3 files (${(totalSize / 1024 / 1024).toFixed(1)}MB)`)
    for (const r of results) {
        if (r.status === 'rejected') window.WH?.debug(`[MO3-CACHE] Failed: ${r.reason}`)
    }
}

/**
 * Prioritized preload: high-priority ids (e.g. the body mesh) are fetched and
 * awaited first because they gate the first renderable frame; low-priority ids
 * (equipment) are kicked off in the background without awaiting so they don't
 * delay readiness.
 *
 * @param {Array<string|number>} highPriority
 * @param {Array<string|number>} lowPriority
 * @returns {Promise<void>} resolves once the high-priority set is cached
 */
async function preloadPrioritized(highPriority, lowPriority) {
    patchAjax()
    // Equipment in the background — never awaited, failures are reported only.
    if (lowPriority && lowPriority.length) {
        preload(lowPriority).catch(e => window.WH?.debug(`[MO3-CACHE] low-priority failed: ${e}`))
    }
    // Body first — awaited so the caller knows it's safe to start the viewer.
    if (highPriority && highPriority.length) {
        await preload(highPriority)
    }
}

function has(id) {
    return _cache.has(_urlFor(id))
}

function clear() {
    _cache.clear()
}

export { patchAjax, preload, preloadPrioritized, has, clear }
