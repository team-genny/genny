const { sortAndDeduplicateDiagnostics } = require('typescript');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns:['e2e'],
  testResultsProcessor: 'jest-sonar-reporter',
};
