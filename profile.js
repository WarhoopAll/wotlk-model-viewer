const marks = {}
const timers = {}
let _observer = null

function mark(name) {
    marks[name] = performance.now()
    window.WH?.debug(`[TIMING] ${name}`)
}

function diff(name) {
    if (!marks[name]) return 0
    return (performance.now() - marks[name]).toFixed(1)
}

function start(name) {
    timers[name] = performance.now()
}

function end(name) {
    if (!timers[name]) return
    const elapsed = (performance.now() - timers[name]).toFixed(1)
    window.WH?.debug(`[TIMING] ${name}: ${elapsed}ms`)
    delete timers[name]
    return parseFloat(elapsed)
}

function summary() {
    const entries = Object.entries(marks)
        .sort((a, b) => a[1] - b[1])
        .map(([name, time], i, arr) => {
            const fromStart = (time - arr[0][1]).toFixed(1)
            const fromPrev = i > 0 ? (time - arr[i - 1][1]).toFixed(1) : '0.0'
            return `${name}: +${fromStart}ms (step ${fromPrev}ms)`
        })
    window.WH?.debug(`[TIMING] === PROFILE SUMMARY ===`)
    entries.forEach(e => window.WH?.debug(`[TIMING] ${e}`))
    window.WH?.debug(`[TIMING] ====================`)
}

function initNetMonitor() {
    if (_observer) return
    if (typeof PerformanceObserver === 'undefined') return
    _observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            const url = entry.name.replace(/^.*\/data\//, 'data/')
            const size = entry.transferSize > 0 ? ` ${Math.round(entry.transferSize / 1024)}KB` : ''
            window.WH?.debug(`[NET] ${entry.initiatorType}: ${url} = ${entry.duration.toFixed(1)}ms${size}`)
        }
    })
    try {
        _observer.observe({ type: 'resource', buffered: true })
        window.WH?.debug(`[TIMING] Network monitor started`)
    } catch (e) {
        window.WH?.debug(`[TIMING] Resource Timing API not available`)
    }
}

function netSummary() {
    if (typeof performance.getEntriesByType !== 'function') return
    const resources = performance.getEntriesByType('resource')
        .filter(e => e.name.includes('/data/') && e.transferSize > 0)
        .sort((a, b) => b.duration - a.duration)

    window.WH?.debug(`[NET] === SLOWEST REQUESTS ===`)
    let totalSize = 0
    for (const r of resources.slice(0, 20)) {
        const url = r.name.replace(/^.*\/data\//, 'data/')
        const size = Math.round(r.transferSize / 1024)
        totalSize += r.transferSize
        window.WH?.debug(`[NET] ${url}: ${r.duration.toFixed(1)}ms (${size}KB) [${r.initiatorType}]`)
    }
    window.WH?.debug(`[NET] Total: ${resources.length} requests, ${Math.round(totalSize / 1024)}KB`)
    window.WH?.debug(`[NET] ========================`)
}

export { mark, diff, start, end, summary, initNetMonitor, netSummary }
