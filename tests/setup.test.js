const {describe, it} = require(`@jest/globals`)

// Import the module to be tested
import {WH} from '../setup'

describe(`WH`, () => {
    it(`check consts`, async () => {
        expect(window.CONTENT_PATH).toEqual(`/data/`)
    })

    it(`check function WH.debug`, async () => {
        WH.debug(`Hello`, `world`)
    })

    it(`check method WH.WebP.getImageExtension`, async () => {
        expect(expect(WH.WebP.getImageExtension()).toEqual(`.webp`))
    })
})

