import {WowModelViewer} from './wow_model_viewer.js'
import {
    findRaceGenderOptions,
    optionsFromModel,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType,
    RACES,
    NOT_DISPLAYED_SLOTS
} from "./character_modeling.js"

import "./setup.js"
import { mark, start, end, summary, initNetMonitor, netSummary, monitorDraw } from './profile.js'
import { preload, preloadPrioritized } from './mo3-cache.js'
import { warmupShaders } from './shader-warmup.js'

/**
 * Predicts the .mo3 ids that will be requested for the model so we can
 * start fetching them in parallel with the JSON customization options,
 * instead of serializing network behind `new WowModelViewer()`.
 *
 * @param model {{race?: number, gender?: number, id?: number, type?: number, items?: Array}}
 * @returns {{highPriority: string[], lowPriority: string[]}}
 */
function predictMo3Ids(model) {
    if (model.id && model.type) {
        // bare model/NPC/item — only the model archive itself
        return { highPriority: [String(model.id)], lowPriority: [] }
    }
    const high = []
    if (model.race && RACES[model.race]) {
        const gender = (model.gender === 1) ? 'female' : 'male'
        high.push(RACES[model.race] + gender)
    }
    // equipment display ids are lower priority — body mesh gates the first frame
    const low = (model.items || [])
        .filter(e => Array.isArray(e) && !NOT_DISPLAYED_SLOTS.has(e[0]))
        .map(e => String(e[1]))
    return { highPriority: high, lowPriority: low }
}

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{id?: number, type?: number, race?: number, gender?: number, items?: Array, inventory?: Array, hideProgressBar?: boolean, contentPath?: string, onReady?: Function}}: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model) {
    if (model.contentPath) window.CONTENT_PATH = model.contentPath
    initNetMonitor()
    // Prime the GPU shader compiler during idle time while the network runs.
    warmupShaders()
    mark(`generateModels start`)

    // Kick off .mo3 preload in parallel with JSON option fetching so the
    // network round-trips overlap instead of running back-to-back.
    const {highPriority, lowPriority} = predictMo3Ids(model)
    if (highPriority.length || lowPriority.length) {
        start(`mo3 preload (parallel)`)
        // intentionally NOT awaited: runs concurrently with the work below
        preloadPrioritized(highPriority, lowPriority)
            .finally(() => end(`mo3 preload (parallel)`))
    }

    let modelOptions
    let fullOptions
    if (model.id && model.type) {
        const {id, type} = model
        modelOptions = {models: {id, type}}
    } else {
        const {race, gender} = model

        start(`findRaceGenderOptions`)
        fullOptions = await findRaceGenderOptions(
            race,
            gender
        )
        end(`findRaceGenderOptions`)

        start(`optionsFromModel`)
        modelOptions = optionsFromModel(model, fullOptions)
        end(`optionsFromModel`)
    }
    modelOptions = {
        hd: true,
        ...modelOptions
    }
    const models = {
        type: 2,
        contentPath: model.contentPath || window.CONTENT_PATH,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        ...modelOptions,
        ...(model?.hideProgressBar ? { hideProgressBar: true } : {})
    }

    window.WH?.debug(`Creating viewer with options`, models)

    mark(`new WowModelViewer()`)
    start(`WowModelViewer constructor + loading`)
    // eslint-disable-next-line no-undef
    const wowModelViewer =  await new WowModelViewer(models)
    monitorDraw()
    if (models.hideProgressBar && wowModelViewer.renderer) {
        const r = wowModelViewer.renderer
        r.updateProgress = function () {
            this.progressBg?.hide()
            this.progressBar?.hide()
            this.progressShown = !1
        }
        r.updateProgress()
    }
    if(fullOptions) {
        wowModelViewer.currentCharacterOptions = fullOptions
        wowModelViewer.characterGender = model.gender
        wowModelViewer.characterRace = model.race

    }
    mark(`generateModels end`)

    // Track engine download completion using requestAnimationFrame instead of
    // a 100ms setTimeout poll. The engine writes progress into
    // renderer.downloads[url].{loaded,total} from XHR onprogress; we just need
    // to observe when every entry has caught up — no busy-waiting.
    const renderer = wowModelViewer.renderer
    let done = false
    let rafId = null

    const fireReady = () => {
        if (done) return
        done = true
        clearTimeout(fallbackTimer)
        if (rafId) cancelAnimationFrame(rafId)
        window.WH?.debug(`[TIMING] All engine downloads complete`)
        summary()
        setTimeout(() => netSummary(), 500)
        // Wait two frames so the first composited frame is actually on screen
        // before signalling readiness.
        let frames = 0
        const waitFrame = () => {
            if (++frames >= 2) {
                model?.onReady?.()
                return
            }
            requestAnimationFrame(waitFrame)
        }
        requestAnimationFrame(waitFrame)
    }

    const fallbackTimer = setTimeout(fireReady, 10000)

    const tick = () => {
        if (done) return
        const downloads = renderer.downloads || {}
        const entries = Object.values(downloads)

        if (entries.length === 0) {
            // No network entries yet. With preload cache the XHR may be served
            // synchronously from memory and never register here; if the viewer
            // is already rendering frames, treat that as ready.
            if (renderer.currFrame && renderer.currFrame > 0) {
                fireReady()
                return
            }
        } else {
            const allDone = entries.every(d => d.total > 0 && d.loaded >= d.total)
            if (allDone) {
                fireReady()
                return
            }
        }
        rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return wowModelViewer
}

export {
    findRaceGenderOptions,
    generateModels,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType
}

export { patchAjax, preload, preloadPrioritized, clear } from './mo3-cache.js'