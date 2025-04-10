export default {
    preset: '@shelf/jest-mongodb',
    transform: {},
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'cobertura'], 
    moduleNameMapper: {
       '^../models/(.*)$': '<rootDir>/models/$1.js',
    },
    extensionsToTreatAsEsm: ['.js'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
  };
  