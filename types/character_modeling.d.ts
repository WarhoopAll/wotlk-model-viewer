import "./setup.js";
declare const RACES: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    10: string;
    11: string;
};
declare const modelingType: {
    ARMOR: number;
    CHARACTER: number;
    COLLECTION: number;
    HELM: number;
    HUMANOIDNPC: number;
    ITEM: number;
    ITEMVISUAL: number;
    NPC: number;
    OBJECT: number;
    PATH: number;
    SHOULDER: number;
};
declare const characterPart: {
    Face: string;
    "Skin Color": string;
    "Hair Style": string;
    "Hair Color": string;
    "Facial Hair": string;
    Mustache: string;
    Beard: string;
    Sideburns: string;
    "Face Shape": string;
    Eyebrow: string;
    "Jaw Features": undefined;
    "Face Features": undefined;
    "Skin Type": undefined;
    Ears: string;
    "Fur Color": string;
    Snout: string;
    Blindfold: undefined;
    Tattoo: undefined;
    "Eye Color": undefined;
    "Tattoo Color": undefined;
    Armbands: undefined;
    "Jewelry Color": undefined;
    Bracelets: undefined;
    Necklace: undefined;
    Earring: undefined;
    "Primary Color": string;
    "Secondary Color Strength": string;
    "Secondary Color": string;
    "Horn Color": string;
    Horns: string;
    "Body Size": string;
};
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
declare function getCharacterOptions(character: {
    face?: number;
    facialStyle?: number;
    gender?: number;
    hairColor?: number;
    hairStyle?: number;
    items?: Array<Array<number>>;
    race?: number;
    skin?: number;
}, fullOptions: Object): [];
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
declare function optionsFromModel(model: {
    race: number;
    gender: number;
    items?: Array<Array<number>>;
    noCharCustomization?: boolean;
}, fullOptions: {}): {
    models: {
        id: string;
        type: number;
    };
    charCustomization: {
        options: [];
    };
    items: (any | any[]);
} | {
    models: {
        id: any;
        type: any;
    };
};
/**
 *
 * @param item{number}: Item id
 * @param slot{number}: Item slot number
 * @param displayId{number}: DisplayId of the item
 * @return {Promise<boolean|*>}
 */
declare function getDisplaySlot(item: number, slot: number, displayId: number): Promise<boolean | any>;
/**
 * Returns a 2-dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<number[]>}
 */
declare function findItemsInEquipments(equipments: any[{
    item: {
        entry: number;
        displayid: number;
    };
    transmog: {
        entry: number;
        displayid: number;
    };
    slot: number;
}]): Promise<number[]>;
declare function findRaceGenderOptions(race: any, gender: any): Promise<any>;
export { optionsFromModel, findRaceGenderOptions, RACES, findItemsInEquipments, getDisplaySlot, getCharacterOptions, characterPart, modelingType };
