import {WowModelViewer} from './wow_model_viewer.js'
import {
    findRaceGenderOptions,
    optionsFromModel,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType
} from "./character_modeling.js"

import "./setup.js"
import { mark, start, end, summary, initNetMonitor, netSummary } from './profile.js'

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @param env {('classic'|'live')}: select game enve
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model, env=`live`) {
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
    if(env === `classic`) {
        modelOptions = {
            dataEnv: `classic`,
            env: `classic`,
            gameDataEnv: `classic`,
            hd: false,
            ...modelOptions
        }
    } else {
        modelOptions = {
            hd: true,
            ...modelOptions
        }
    }
    const models = {
        type: 2,
        contentPath: window.CONTENT_PATH,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        ...modelOptions
    }

    window.WH?.debug(`Creating viewer with options`, models)

    mark(`new WowModelViewer()`)
    start(`WowModelViewer constructor + loading`)
    // eslint-disable-next-line no-undef
    const wowModelViewer =  await new WowModelViewer(models)
    end(`WowModelViewer constructor + loading`)
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