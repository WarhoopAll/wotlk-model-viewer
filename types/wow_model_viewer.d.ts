declare class WowModelViewer extends ZamModelViewer {
    _currentCharacterOptions: number;
    _characterGender: null;
    _characterRace: null;
    get currentCharacterOptions(): number;
    set currentCharacterOptions(v: number);
    get characterGender(): null;
    set characterGender(v: null);
    get characterRace(): null;
    set characterRace(v: null);
    /**
     * Returns the list of animation names
     * @returns {Array.<string>}
     */
    getListAnimations(): Array<string>;
    /**
     * Change character distance
     * @param {number} val
     */
    setDistance(val: number): void;
    /**
     * Returns character distance
     * @return {number}
     */
    getDistance(): number;
    /**
     * Change the animation
     * @param {string} val
     */
    setAnimation(val: string): void;
    /**
     * Play / Pause the animation
     * @param {boolean} val
     */
    setAnimPaused(val: boolean): void;
    /**
     * Set azimuth value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setAzimuth(val: number): void;
    /**
     * Set zenith value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setZenith(val: number): void;
    /**
     * Returns azimuth value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getAzimuth(): number;
    /**
     * Returns zenith value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getZenith(): number;
    /**
     * This methode is based on `updateViewer` from Paperdoll.js (https://wow.zamimg.com/js/Paperdoll.js?3ee7ec5121)
     *
     * @param slot {number}: Item slot number
     * @param displayId {number}: Item display id
     * @param enchant {number}: Enchant (experimental not tested)
     */
    updateItemViewer(slot: number, displayId: number, enchant: number): void;
    setNewAppearance(options: any): void;
}
export { WowModelViewer, };
