/**
 * Off-main-thread .mo3 decompression.
 *
 * Background — why this exists
 * ----------------------------
 * The vendor engine decompresses every .mo3 archive synchronously on the main
 * thread inside its `bT(t)` method: `F = (0, Zr.inflate)(k)`. For a typical
 * character with several equipment archives this is a multi-hundred-ms
 * main-thread freeze per model and blocks input/animation while it runs.
 *
 * Approach
 * --------
 * We can't make the vendor method `async` (it's invoked from a synchronous
 * XHR callback). Instead we decompress **ahead of time** in a Web Worker
 * during `preload()` and cache the *already-decompressed* archive. A tiny
 * hook installed in vendor then skips the synchronous `Zr.inflate` call when
 * the buffer is recognised as pre-inflated.
 *
 * Format produced by the worker
 * -----------------------------
 * A .mo3 archive is:  <big-endian header uint32s...> <DEFLATE payload>.
 * The engine reads the header straight from byte 0 via `new Rn(t)` and only
 * then slices `new Uint8Array(t, i.position)` to inflate the tail. So the
 * worker preserves the original header bytes verbatim at offset 0 and
 * replaces only the DEFLATE tail with its raw inflated bytes:
 *
 *     [ header bytes ... (unchanged) ][ inflated payload ]
 *
 * Pre-inflated buffers are tracked in a module-level WeakSet (NOT via an
 * inline byte marker) because any bytes prepended at offset 0 would shift
 * the header and break the engine's magic-value check. The hook strips the
 * header and returns just the inflated payload when it recognises the buffer.
 *
 * If the worker is unavailable (no Worker / transfer failure), everything
 * gracefully degrades to the engine's built-in synchronous inflate — there is
 * no correctness regression.
 */

// Buffers that have already been inflated off-thread. Tracked via a WeakSet
// (keyed on the ArrayBuffer) instead of an inline byte marker, because the
// engine reads the archive header straight from byte 0 via `new Rn(t)` — any
// prepended marker would shift the header and break the magic-value check.
const _preinflated = new WeakSet()

// Worker source. Loaded from a Blob URL so this module stays self-contained
// and works without a bundler (the project ships raw ES modules).
const WORKER_SOURCE = `
'use strict';
// pako_inflate ships as an IIFE that sets self.pako; we importScripts it.
const PAKO_URL = 'https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako_inflate.min.js';
let _pako = null;
async function loadPako() {
    if (_pako) return _pako;
    if (typeof self.pako !== 'undefined') { _pako = self.pako; return _pako; }
    await new Promise((resolve, reject) => {
        try { importScripts(PAKO_URL); resolve(); }
        catch (e) { reject(e); }
    });
    _pako = self.pako;
    return _pako;
}

self.onmessage = async (e) => {
    const { id, buffer } = e.data;
    try {
        const view = new DataView(buffer);
        // Mirror the engine header read (big-endian, no littleEndian arg).
        // The engine's bT() reads 29 getUint32() calls (magic + version +
        // 27 fields) before slicing the DEFLATE payload at i.position.
        const HEADER_UINT32S = 29;
        const headerEnd = HEADER_UINT32S * 4;
        if (view.byteLength < headerEnd) throw new Error('buffer too small for mo3 header');

        const pako = await loadPako();
        const compressed = new Uint8Array(buffer, headerEnd);
        const inflated = pako.inflate(compressed);

        // Reassemble preserving the ORIGINAL header at byte 0 (the engine
        // reads it directly via new Rn(t)), followed by the already-inflated
        // payload in place of the DEFLATE stream.
        const out = new Uint8Array(headerEnd + inflated.length);
        out.set(new Uint8Array(buffer, 0, headerEnd), 0);
        out.set(inflated, headerEnd);

        self.postMessage({ id, ok: true, buffer: out.buffer }, [out.buffer]);
    } catch (err) {
        // Return the original buffer untouched on any failure — the engine
        // will run its own synchronous inflate as a fallback.
        self.postMessage({ id, ok: false, error: String(err && err.message || err), buffer }, [buffer]);
    }
};
`

let _url = null
let _pool = null

function getUrl() {
    if (_url) return _url
    const blob = new Blob([WORKER_SOURCE], { type: 'text/javascript' })
    _url = URL.createObjectURL(blob)
    return _url
}

class InflatePool {
    constructor() {
        const size = Math.min(Math.max(navigator.hardwareConcurrency || 2, 1), 4)
        const url = getUrl()
        this.workers = []
        for (let i = 0; i < size; i++) {
            try {
                const w = new Worker(url)
                w._busy = false
                w._queue = []
                w.onmessage = (e) => this._resolve(w, e.data)
                w.onerror = (err) => {
                    window.WH?.debug(`[INFLATE-WORKER] error: ${err.message}`)
                    // fail any pending job so it falls back
                    this._rejectAll(w, err)
                }
                this.workers.push(w)
            } catch (e) {
                window.WH?.debug(`[INFLATE-WORKER] worker init failed: ${e}`)
            }
        }
    }

    get available() {
        return this.workers.length > 0
    }

    _resolve(w, data) {
        const { resolve } = w._current || {}
        w._current = null
        w._busy = false
        resolve?.(data)
        // pump queue
        if (w._queue.length) {
            const next = w._queue.shift()
            this._dispatch(w, next.buffer, next.resolve, next.reject)
        }
    }

    _rejectAll(w, err) {
        const { reject } = w._current || {}
        w._current = null
        w._busy = false
        reject?.(err)
        while (w._queue.length) w._queue.shift().reject(err)
    }

    _dispatch(w, buffer, resolve, reject) {
        w._busy = true
        w._current = { resolve, reject }
        w.postMessage({ id: 0, buffer }, [buffer])
    }

    /**
     * Decompress a .mo3 ArrayBuffer off the main thread.
     * Resolves with { ok, buffer }: on success buffer is the pre-inflated
     * archive (with marker); on failure buffer is the original input back and
     * ok===false, so the caller can fall back to the engine's inflate.
     *
     * @param {ArrayBuffer} buffer
     * @returns {Promise<{ok: boolean, buffer: ArrayBuffer}>}
     */
    inflate(buffer) {
        return new Promise((resolve, reject) => {
            const free = this.workers.find(w => !w._busy)
            const job = { buffer, resolve, reject }
            if (free) {
                this._dispatch(free, buffer, resolve, reject)
            } else {
                // all busy — queue on the least-loaded worker
                this.workers.sort((a, b) => a._queue.length - b._queue.length)[0]._queue.push(job)
            }
        })
    }
}

function getPool() {
    if (_pool) return _pool
    if (typeof Worker === 'undefined') return null
    try {
        _pool = new InflatePool()
    } catch (e) {
        window.WH?.debug(`[INFLATE-WORKER] pool unavailable: ${e}`)
        _pool = null
    }
    return _pool
}

/**
 * Inflate a .mo3 archive off-main-thread. Resolves with the *original*
 * buffer if no worker is available — callers must then let the engine's
 * built-in inflate run.
 *
 * @param {ArrayBuffer} buffer raw .mo3 bytes
 * @returns {Promise<ArrayBuffer>}
 */
export async function inflateMo3(buffer) {
    const pool = getPool()
    if (!pool || !pool.available) return buffer
    const t0 = performance.now()
    const res = await pool.inflate(buffer)
    const ms = (performance.now() - t0).toFixed(1)
    if (res.ok) {
        // Tag the *result* buffer so the engine hook recognises it. The hook
        // runs synchronously later, inside the engine, and reads this set.
        _preinflated.add(res.buffer)
        window.WH?.debug(`[INFLATE-WORKER] decompressed off-thread in ${ms}ms`)
        return res.buffer
    }
    window.WH?.debug(`[INFLATE-WORKER] failed (${res.error}), falling back to engine inflate`)
    return res.buffer
}

/**
 * Installs the inflate hook on window. The (single) vendor patch reads
 * `window.__inflateHook(t)` — if it returns a Uint8Array, that value replaces
 * the engine's inflate output and the synchronous `Zr.inflate` is skipped; if
 * it returns null/undefined, the engine runs its own inflate as before.
 *
 * Safe to call multiple times.
 */
export function installInflateHook() {
    if (window.__inflateHook) return
    window.__inflateHook = (buffer) => {
        // Recognise buffers we inflated ahead of time. The tail past the
        // header is already raw inflated bytes, so slice them out exactly as
        // the engine would have done with the DEFLATE stream.
        if (!_preinflated.has(buffer)) return null
        const headerEnd = 29 * 4 // header uint32 count, big-endian
        return new Uint8Array(buffer, headerEnd)
    }
    window.WH?.debug('[INFLATE-WORKER] vendor hook installed')
}
