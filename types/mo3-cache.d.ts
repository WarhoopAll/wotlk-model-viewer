declare function patchAjax(): boolean;
declare function preload(ids: any): Promise<void>;
declare function has(id: any): boolean;
declare function clear(): void;
export { patchAjax, preload, has, clear };
