import {getCharacterOptions} from "./character_modeling.js"


// eslint-disable-next-line no-undef
class WowModelViewer extends ZamModelViewer {
    _currentCharacterOptions = 0
    _characterGender = null
    _characterRace = null

    get currentCharacterOptions() { return this._currentCharacterOptions }
    set currentCharacterOptions(v) { this._currentCharacterOptions = v }

    get characterGender() { return this._characterGender }
    set characterGender(v) { this._characterGender = v }

    get characterRace() { return this._characterRace }
    set characterRace(v) { this._characterRace = v }

    /**
     * Returns the list of animation names
     * @returns {Array.<string>}
     */
    getListAnimations() {
        if (!this.renderer?.actors?.[0]?.h?.P?.Q) {
            return []
        }
        return this.renderer.actors[0].h.P.Q.map(e => e.l)
    }

    /**
     * Change character distance
     * @param {number} val
     */
    setDistance(val) {
        if (this.renderer) {
            this.renderer.distance = val
        }
    }

    /**
     * Returns character distance
     * @return {number}
     */
    getDistance() {
        return this.renderer?.distance
    }

    /**
     * Change the animation
     * @param {string} val
     */
    setAnimation(val) {
        this.renderer?.actors?.[0]?.setAnimation(val)
    }

    /**
     * Play / Pause the animation
     * @param {boolean} val
     */
    setAnimPaused(val) {
        if (val === ``) {
            throw new Error(`Empty value not allowed`)
        }
        this.renderer?.actors?.[0]?.setAnimPaused(val)
    }

    /**
     * Set azimuth value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setAzimuth(val) {
        if (this.renderer) {
            this.renderer.azimuth = val
        }
    }

    /**
     * Set zenith value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setZenith(val) {
        if (this.renderer) {
            this.renderer.zenith = val
        }
    }

    /**
     * Returns azimuth value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getAzimuth() {
        return this.renderer?.azimuth ?? 0
    }

    /**
     * Returns zenith value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getZenith() {
        return this.renderer?.zenith ?? 0
    }

    /**
     * This methode is based on `updateViewer` from Paperdoll.js (https://wow.zamimg.com/js/Paperdoll.js?3ee7ec5121)
     *
     * @param slot {number}: Item slot number
     * @param displayId {number}: Item display id
     * @param enchant {number}: Enchant (experimental not tested)
     */
    updateItemViewer(slot, displayId, enchant) {
        const s = window.WH.Wow.Item
        if (slot === s.INVENTORY_TYPE_SHOULDERS) {
            // this.method(`setShouldersOverride`, [this.getShouldersOverrideData()]);
        }
        const a = (slot === s.INVENTORY_TYPE_ROBE) ? s.INVENTORY_TYPE_CHEST : slot

        window.WH.debug(`Clearing model viewer slot:`, a.toString())
        this.method(`clearSlots`, slot.toString())
        if (displayId) {
            window.WH.debug(`Attaching to model viewer slot:`, slot.toString(), `Display ID:`, displayId, `Enchant Visual:`, enchant)
            this.method(`setItems`, [[{
                slot: slot,
                display: displayId,
                visual: enchant || 0
            }]])
        }
    }

    setNewAppearance(options) {
        if(!this.currentCharacterOptions) {
            throw Error(`Character options are not set`)
        }
        const characterOptions = getCharacterOptions(options, this.currentCharacterOptions)
        const race = this.characterRace
        const gender = this.characterGender
        this.method(`setAppearance`, {race: race, gender: gender, options: characterOptions})
    }
}


export {
    WowModelViewer,
}