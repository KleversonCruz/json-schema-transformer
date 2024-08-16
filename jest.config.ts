import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist', 'index.ts'],
  coverageProvider: 'babel',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolateModules: true,
      },
    ],
  },
};

export default config;
