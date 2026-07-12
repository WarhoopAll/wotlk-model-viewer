import "./setup.js"

const NOT_DISPLAYED_SLOTS = new Set([
    2, // neck
    11, // finger1
    12, // finger1
    13, // trinket1
    14, // trinket2
])

const RACES = {
    1: `human`,
    2: `orc`,
    3: `dwarf`,
    4: `nightelf`,
    5: `scourge`,
    6: `tauren`,
    7: `gnome`,
    8: `troll`,
    10: `bloodelf`,
    11: `draenei`
}

const modelingType = {
    ARMOR: 128,
    CHARACTER: 16,
    COLLECTION: 1024,
    HELM: 2,
    HUMANOIDNPC: 32,
    ITEM: 1,
    ITEMVISUAL: 512,
    NPC: 8,
    OBJECT: 64,
    PATH: 256,
    SHOULDER: 4
}

const characterPart = {
    Face: `face`,
    "Skin Color": `skin`,
    "Hair Style": `hairStyle`,
    "Hair Color": `hairColor`,
    "Facial Hair": `facialStyle`,
    Mustache: `facialStyle`,
    Beard: `facialStyle`,
    Sideburns: `facialStyle`,
    "Face Shape": `facialStyle`,
    Eyebrow: `facialStyle`,
    "Jaw Features": undefined,
    "Face Features": undefined,
    "Skin Type": undefined,
    Ears: `ears`,
    "Fur Color": `furColor`,
    Snout: `snout`,
    Blindfold: undefined,
    Tattoo: undefined,
    "Eye Color": undefined,
    "Tattoo Color": undefined,
    Armbands: undefined,
    "Jewelry Color": undefined,
    Bracelets: undefined,
    Necklace: undefined,
    Earring: undefined,
    "Primary Color": `primaryColor`,
    "Secondary Color Strength": `secondaryColorStrength`,
    "Secondary Color": `secondaryColor`,
    "Horn Color": `hornColor`,
    Horns:  `horns`,
    "Body Size": `bodySize`
}

/**
 *
 * @param {Object} character - The character object.
 * @param {number} [character.face] - Description for face.
 * @param {number} [character.facialStyle] - Description for facialStyle.
 * @param {number} [character.gender] - Description for gender.
 * @param {number} [character.hairColor] - Description for hairColor.
 * @param {number} [character.hairStyle] - Description for hairStyle.
 * @param {Array<Array<number>>} [character.items] - Description for items.
 * @param {number} [character.race] - Description for race.
 * @param {number} [character.skin] - Description for skin.
 * @param {Object} fullOptions - Zaming API character options payload.
 * @return {[]}
 */
function getCharacterOptions(character, fullOptions) {
    const options = fullOptions?.Options || []
    // Building the options Map is O(n) over all customization choices; cache it
    // per fullOptions object (WeakMap keys on the object reference) so repeated
    // appearance changes from UI sliders don't rebuild it every call.
    let optionsMap = _optionsMapCache.get(fullOptions)
    if (!optionsMap) {
        optionsMap = new Map(options.map(e => [e.Name, e]))
        _optionsMapCache.set(fullOptions, optionsMap)
    }
    const missingChoice = []
    const ret = []

    for (const prop in characterPart) {
        const part = optionsMap.get(prop)

        if (!part || !part.Choices || part.Choices.length === 0) {
            continue
        }

        const partKey = characterPart[prop]
        let choiceId

        if (partKey && character[partKey] !== undefined) {
            const choice = part.Choices?.[character[partKey]]
            choiceId = choice ? choice.Id : undefined
        }

        if (choiceId === undefined) {
            choiceId = part.Choices[0]?.Id
            if (partKey && character[partKey] !== undefined) {
                missingChoice.push(partKey)
            }
        }

        if (choiceId !== undefined) {
            ret.push({
                optionId: part.Id,
                choiceId: choiceId
            })
        }
    }

    if (missingChoice.length > 0) {
        window.WH.debug(`In character: `, character, `the following options are missing`, missingChoice)
    }

    return ret
}

/**
 * This function return the design choices for a character this does not work for NPC / Creature / Items
 * @param {Object} model - The model object to generate options from.
 * @param {number} model.race - The race of the character.
 * @param {number} model.gender - The gender of the character.
 * @param {Array<Array<number>>} [model.items] - The items array.
 * @param {boolean} [model.noCharCustomization] - If true, skip character customization.
 * @param {{}} fullOptions - The type of the model.
 * @returns {{models: {id: string, type: number}, charCustomization: {options: []}, items: (*|*[])}|{models: {id, type}}}
 */
function optionsFromModel(model, fullOptions) {
    const {race, gender} = model

    const retGender = (gender === 1) ? `female` : `male`
    const raceToModelId = RACES[race] + retGender
    const characterItems = (model.items) ? model.items.filter(e => Array.isArray(e) && !NOT_DISPLAYED_SLOTS.has(e[0])) : []
    const options = getCharacterOptions(model, fullOptions)

    const charCustomization = {
        options: options
    }

    const ret = {
        items: characterItems,
        models: {
            id: raceToModelId,
            type: modelingType.CHARACTER
        },
    }
    if(!model.noCharCustomization) {
        ret.charCustomization = charCustomization
    }
    return ret
}



/**
 *
 * @param item{number}: Item id
 * @param slot{number}: Item slot number
 * @param displayId{number}: DisplayId of the item
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot(item, slot, displayId) {
    if (typeof item !== `number`) {
        throw new Error(`item must be a number`)
    }

    if (typeof slot !== `number`) {
        throw new Error(`slot must be a number`)
    }

    if (typeof displayId !== `number`) {
        throw new Error(`displayId must be a number`)
    }

    try {
        const resp = await fetch(`${window.CONTENT_PATH}meta/armor/${slot}/${displayId}.json`)
        const meta = await resp.json()
        // If the meta explicitly remaps the slot/display, honour it; otherwise
        // keep the requested values. Previously the fetched JSON was discarded.
        // Guard against empty/failed bodies so a missing meta file still falls
        // through to the legacy slot remap below.
        if (meta && typeof meta === 'object' && (meta.displaySlot != null || meta.displayId != null)) {
            return {
                displaySlot: meta.displaySlot ?? slot,
                displayId: meta.displayId ?? displayId
            }
        }
        return {
            displaySlot: slot,
            displayId: displayId
        }
    } catch (e) {
        // network/parse error — fall through to slot remap below
    }

    // old slots to new slots
    const retSlot = {
        5: 20, // chest
        16: 21, // main hand
        18: 22 // off hand
    }[slot]

    if (!retSlot) {
        window.WH.debug(`Item: ${item} display: ${displayId} or slot: ${slot} not found for `)

        return {
            displaySlot: slot,
            displayId: displayId
        }
    }

    return {
        displaySlot: retSlot,
        displayId: displayId
    }
}



/**
 * Returns a 2-dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<number[]>}
 */
async function findItemsInEquipments(equipments) {
    const results = await Promise.all(equipments.map(async (equipment) => {
        if (NOT_DISPLAYED_SLOTS.has(equipment.slot)) return null

        const hasTransmog = equipment.transmog && Object.keys(equipment.transmog).length !== 0
        const displayedItem = hasTransmog ? equipment.transmog : equipment.item

        if (!displayedItem) return null

        const displaySlot = await getDisplaySlot(
            displayedItem.entry,
            equipment.slot,
            displayedItem.displayid
        )
        return [displaySlot.displaySlot, displaySlot.displayId]
    }))
    return results.filter(Boolean)
}


/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
const _optionsCache = new Map()
const _optionsMapCache = new WeakMap()

async function findRaceGenderOptions(race, gender) {
    const key = `${race}_${gender}`
    if (_optionsCache.has(key)) return _optionsCache.get(key)
    const options = await fetch(`${window.CONTENT_PATH}meta/charactercustomization2/${key}.json`)
        .then(
            (response) => response.json()
        )
    const data = options.data || options
    _optionsCache.set(key, data)
    return data
}

export {
    optionsFromModel,
    findRaceGenderOptions,
    RACES,
    findItemsInEquipments,
    getDisplaySlot,
    getCharacterOptions,
    characterPart,
    modelingType,
    NOT_DISPLAYED_SLOTS
}