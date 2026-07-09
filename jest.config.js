module.exports = {
    testEnvironment: `jest-environment-jsdom`,
    testMatch: [`**/tests/**/*.test.[jt]s?(x)`],
    transform: {
        "^.+\\.js$": `babel-jest`
    },
    moduleNameMapper: {
        "viewer\\.min\\.js$": `<rootDir>/tests/__mocks__/viewerMock.js`
    }
}