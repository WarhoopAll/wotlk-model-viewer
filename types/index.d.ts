import { WowModelViewer } from './wow_model_viewer.js';
import { findRaceGenderOptions, getDisplaySlot, findItemsInEquipments, modelingType } from "./character_modeling.js";

interface GenerateModelsOptions {
    hideProgressBar?: boolean;
    onReady?: () => void;
}

declare function generateModels(
    aspect: number,
    containerSelector: string,
    model: { id: string; type: number } | { id: number; type: number },
    env?: 'classic' | 'live',
    options?: GenerateModelsOptions
): Promise<WowModelViewer>;

declare function patchAjax(): void;
declare function preload(urls?: string[]): Promise<void>;
declare function has(url: string): boolean;
declare function clear(): void;

export {
    findRaceGenderOptions,
    generateModels,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType,
    patchAjax,
    preload,
    has,
    clear,
};
