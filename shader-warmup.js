/**
 * Best-effort WebGL shader compiler warm-up.
 *
 * The engine compiles a small fixed set of GLSL programs synchronously on the
 * first frame (see vendor/viewer.min.js — createShader/compileShader). Each
 * synchronous compile is a main-thread stall. There is no cross-context
 * program cache in WebGL1, so we can't pre-build the engine's own programs
 * from a side context.
 *
 * What we *can* do cheaply:
 *   1. Detect KHR_parallel_shader_compile (if present anywhere) so the caller
 *      can opt into non-blocking status checks later.
 *   2. Prime the platform's shader compiler by compiling a trivial program on
 *      a throwaway context during idle time. The first compile on a fresh
 *      context pays the heaviest driver/compiler-init cost; subsequent
 *      compiles on the engine's context are noticeably cheaper.
 *
 * This runs entirely off the engine's hot path and degrades to a no-op if
 * WebGL is unavailable.
 */

let _warmed = false

export function supportsParallelCompile() {
    try {
        const c = document.createElement('canvas')
        const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
        return !!(gl && gl.getExtension('KHR_parallel_shader_compile'))
    } catch (_) {
        return false
    }
}

function compileTrivial(gl) {
    const vsSrc = 'attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}'
    const fsSrc = 'precision lowp float;void main(){gl_FragColor=vec4(0.0);}'
    const vs = gl.createShader(gl.VERTEX_SHADER)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    if (!vs || !fs) return
    gl.shaderSource(vs, vsSrc)
    gl.shaderSource(fs, fsSrc)
    gl.compileShader(vs)
    gl.compileShader(fs)
    const prog = gl.createProgram()
    if (prog) {
        gl.attachShader(prog, vs)
        gl.attachShader(prog, fs)
        gl.linkProgram(prog)
        gl.deleteProgram(prog)
    }
    gl.deleteShader(vs)
    gl.deleteShader(fs)
}

/**
 * Warm the shader compiler during idle time. Safe to call multiple times.
 * Schedules the work via requestIdleCallback when available so it never
 * competes with the engine's own startup work.
 */
export function warmupShaders() {
    if (_warmed) return
    _warmed = true

    const run = () => {
        try {
            const c = document.createElement('canvas')
            c.width = c.height = 1
            const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
            if (!gl) return
            compileTrivial(gl)
            // lose the context promptly so the GPU driver can reclaim it
            const lose = gl.getExtension('WEBGL_lose_context')
            lose?.loseContext()
            window.WH?.debug('[SHADER-WARMUP] compiler primed')
        } catch (e) {
            window.WH?.debug(`[SHADER-WARMUP] skipped: ${e}`)
        }
    }

    if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(run, { timeout: 1000 })
    } else {
        setTimeout(run, 0)
    }
}
