import {WowModelViewer} from './wow_model_viewer.js'
import {
    findRaceGenderOptions,
    optionsFromModel,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType
} from "./character_modeling.js"

import "./setup.js"
import { mark, start, end, summary, initNetMonitor, netSummary, monitorDraw } from './profile.js'

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model) {
    initNetMonitor()
    mark(`generateModels start`)
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
        contentPath: window.CONTENT_PATH,
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

    // Track engine download completion
    const renderer = wowModelViewer.renderer
    const checkDownloads = () => {
        const downloads = renderer.downloads || {}
        const pending = Object.values(downloads).filter(d => d.total > d.loaded)
        if (pending.length === 0) {
            window.WH?.debug(`[TIMING] All engine downloads complete`)
            summary()
            setTimeout(() => netSummary(), 500)
            // Wait 2 frames for first render to complete, then fire onReady
            let frames = 0
            const waitFrame = () => {
                if (++frames >= 2) {
                    model?.onReady?.()
                    return
                }
                requestAnimationFrame(waitFrame)
            }
            requestAnimationFrame(waitFrame)
        } else {
            setTimeout(checkDownloads, 100)
        }
    }
    setTimeout(checkDownloads, 100)

    return wowModelViewer
}

export {
    findRaceGenderOptions,
    generateModels,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType
}

export { patchAjax, preload, clear } from './mo3-cache.js'