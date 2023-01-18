import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

export default {
  rootDir: 'src',
  testRegex: '.*\\.e2e.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['../tests/setupTests.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
}
