module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/index.js',
    '!<rootDir>/src/scan.js',
    '!<rootDir>/src/utils/words-typos.js',
    '!<rootDir>/src/bin/**',
  ],
  testEnvironment: 'jsdom',
};
