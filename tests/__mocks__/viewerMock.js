
window.WH = {
    debug: jest.fn(),
    defaultAnimation: `Stand`,
    WebP: { getImageExtension: () => `.webp` },
    Wow: {
        Item: {
            INVENTORY_TYPE_HEAD: 1, INVENTORY_TYPE_NECK: 2, INVENTORY_TYPE_SHOULDERS: 3,
            INVENTORY_TYPE_SHIRT: 4, INVENTORY_TYPE_CHEST: 5, INVENTORY_TYPE_WAIST: 6,
            INVENTORY_TYPE_LEGS: 7, INVENTORY_TYPE_FEET: 8, INVENTORY_TYPE_WRISTS: 9,
            INVENTORY_TYPE_HANDS: 10, INVENTORY_TYPE_FINGER: 11, INVENTORY_TYPE_TRINKET: 12,
            INVENTORY_TYPE_ONE_HAND: 13, INVENTORY_TYPE_SHIELD: 14, INVENTORY_TYPE_RANGED: 15,
            INVENTORY_TYPE_BACK: 16, INVENTORY_TYPE_TWO_HAND: 17, INVENTORY_TYPE_BAG: 18,
            INVENTORY_TYPE_TABARD: 19, INVENTORY_TYPE_ROBE: 20, INVENTORY_TYPE_MAIN_HAND: 21,
            INVENTORY_TYPE_OFF_HAND: 22, INVENTORY_TYPE_HELD_IN_OFF_HAND: 23,
            INVENTORY_TYPE_PROJECTILE: 24, INVENTORY_TYPE_THROWN: 25,
            INVENTORY_TYPE_RANGED_RIGHT: 26, INVENTORY_TYPE_QUIVER: 27, INVENTORY_TYPE_RELIC: 28
        }
    }
}

window.jQuery = jest.fn()
window.$ = window.jQuery

class ZamModelViewer {
    constructor() {
        this.renderer = {
            models: [{
                an: [
                    { j: `animation1`, b: 0, a: 0 },
                    { j: `animation2`, b: 0, a: 1 },
                    { j: `animation3`, b: 0, a: 2 }
                ],
                setAnimation: function (val) {
                },
                setAnimPaused: function (val) {
                    if (val === ``) {
                        throw new Error(`Empty value not allowed`)
                    }
                }
            }],
            distance: 100,
            azimuth: 0,
            zenith: 0
        }
    }

    getModel() {
        return this.renderer.models[0]
    }

    getDistance() {
        return this.renderer.distance
    }

    setDistance(val) {
        this.renderer.distance = val
    }

    setAnimPaused(val) {
        const model = this.getModel()
        if (model && model.setAnimPaused) {
            model.setAnimPaused(val)
        }
    }

    method(methodName, args) {
        if (methodName === `setAppearance`) {
            this.appearance = args
        }
    }
}

global.ZamModelViewer = ZamModelViewer