import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import dotenv from 'dotenv'

dotenv.config({ path: './.env.test', override: true })

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  roots: [
    '<rootDir>/src',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  collectCoverage: true,
  coverageDirectory: '.reports/cov',
  collectCoverageFrom: ['./src/**'],
  coveragePathIgnorePatterns: [
    '.mock.ts',
    'index.ts',
    'src/application/Router.ts',
    '.json',
  ],
  coverageThreshold: {
    global: {},
    // './src/application': {
    //   lines: 50,
    // },
  },
}

export default config
