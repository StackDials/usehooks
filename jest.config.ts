import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/mocks/**'],
  coveragePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
      functions: 80,
      branches: 60,
    },
  },
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  testRegex: ['.*\\.spec\\.ts$', '.*\\.test\\.ts$'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks: true,
  projects: ['<rootDir>/**/jest.config.js'],
  coverageReporters: ['json-summary', 'lcov'],
}
