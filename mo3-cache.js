const _cache = new Map()

function patchAjax() {
    if (typeof jQuery === 'undefined') return false
    if (jQuery._mo3Patched) return true
    jQuery._mo3Patched = true
    const _orig = jQuery.ajax
    jQuery.ajax = function (opts) {
        if (typeof opts === 'string') opts = { url: opts }
        const url = opts.url || ''
        if (url.includes('.mo3') && _cache.has(url)) {
            const data = _cache.get(url)
            window.WH?.debug(`[MO3-CACHE] HIT: ${url.replace(/^.*\/mo3\//, 'mo3/')} (${(data.byteLength / 1024).toFixed(0)}KB)`)
            queueMicrotask(() => {
                opts.success?.(data)
                opts.complete?.(data, 'success')
            })
            const xhr = { readyState: 4, status: 200, response: data, responseText: null }
            return xhr
        }
        return _orig.apply(this, arguments)
    }
    window.WH?.debug('[MO3-CACHE] $.ajax patched')
    return true
}

async function preload(ids) {
    patchAjax()
    const base = window.CONTENT_PATH || '/data/'
    const toFetch = ids.filter(id => !_cache.has(base + 'mo3/' + id + '.mo3'))
    if (toFetch.length === 0) {
        window.WH?.debug(`[MO3-CACHE] All ${ids.length} MO3 files already cached`)
        return
    }

    window.WH?.debug(`[MO3-CACHE] Preloading ${toFetch.length} MO3 files...`)
    const results = await Promise.allSettled(
        toFetch.map(async (id) => {
            const url = base + 'mo3/' + id + '.mo3'
            const resp = await fetch(url)
            if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${url}`)
            const buf = await resp.arrayBuffer()
            _cache.set(url, buf)
            return { id, size: buf.byteLength }
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

function has(id) {
    const url = (window.CONTENT_PATH || '/data/') + 'mo3/' + id + '.mo3'
    return _cache.has(url)
}

function clear() {
    _cache.clear()
}

export { patchAjax, preload, has, clear }
