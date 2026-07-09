import { WowModelViewer } from './wow_model_viewer.js';
import { findRaceGenderOptions, getDisplaySlot, findItemsInEquipments, modelingType } from "./character_modeling.js";
import "./setup.js";
/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @param env {('classic'|'live')}: select game enve
 * @returns {Promise<WowModelViewer>}
 */
declare function generateModels(aspect: number, containerSelector: string, model: {} | {
    id: number;
    type: number;
}, env?: ('classic' | 'live')): Promise<WowModelViewer>;
export { findRaceGenderOptions, generateModels, getDisplaySlot, findItemsInEquipments, modelingType };
