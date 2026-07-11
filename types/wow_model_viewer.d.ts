declare class WowModelViewer extends ZamModelViewer {
    getListAnimations(): Array<string>;
    setDistance(val: number): void;
    getDistance(): number | undefined;
    setAnimation(val: string): void;
    setAnimPaused(val: boolean): void;
    setAzimuth(val: number): void;
    setZenith(val: number): void;
    getAzimuth(): number;
    getZenith(): number;
    updateItemViewer(slot: number, displayId: number, enchant: number): void;
    setNewAppearance(options: Record<string, any>): void;
}
export { WowModelViewer };
