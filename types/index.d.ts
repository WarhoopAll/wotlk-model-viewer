import { WowModelViewer } from './wow_model_viewer.js';
import { findRaceGenderOptions, getDisplaySlot, findItemsInEquipments, modelingType } from "./character_modeling.js";
import "./setup.js";
interface ModelOptions {
    id?: number;
    type?: number;
    race?: number;
    gender?: number;
    items?: (number | [number, number])[];
    inventory?: { slot: number; item_instance?: { item_display?: { item_display_info_id?: number } } }[];
    hideProgressBar?: boolean;
    contentPath?: string;
    onReady?: () => void;
}

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {ModelOptions}: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
declare function generateModels(aspect: number, containerSelector: string, model: ModelOptions): Promise<WowModelViewer>;
export { findRaceGenderOptions, generateModels, getDisplaySlot, findItemsInEquipments, modelingType };
export { patchAjax, preload, clear } from './mo3-cache.js';
