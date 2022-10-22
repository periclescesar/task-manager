import config from './jest.config'

// Sync object
config.roots = ['<rootDir>/test/functional']
config.collectCoverage = false
config.testMatch = ['**/test/**/*.+(ts|tsx|js)']

export default config
