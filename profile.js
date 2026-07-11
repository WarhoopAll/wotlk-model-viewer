const marks = {}
const timers = {}

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
    const results = []
    for (const name of Object.keys(timers)) {
        results.push(`${name}: ${((performance.now() - timers[name])).toFixed(1)}ms`)
    }
    const entries = Object.entries(marks)
        .sort((a, b) => a[1] - b[1])
        .map(([name, time], i, arr) => {
            const fromStart = (time - arr[0][1]).toFixed(1)
            const fromPrev = i > 0 ? (time - arr[i - 1][1]).toFixed(1) : '0.0'
            return `${name}: +${fromStart}ms (step ${fromPrev}ms)`
        })
    window.WH?.debug(`[TIMING] === PROFILE SUMMARY ===`)
    entries.forEach(e => window.WH?.debug(`[TIMING] ${e}`))
    if (results.length) {
        results.forEach(r => window.WH?.debug(`[TIMING] ${r}`))
    }
    window.WH?.debug(`[TIMING] ====================`)
}

export { mark, diff, start, end, summary }
