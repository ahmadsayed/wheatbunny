export default {
  testEnvironment: 'jsdom',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1.js',
  },
  testMatch: ['**/tests/**/*.test.js'],
  testPathIgnorePatterns: ['tests/e2e/'],
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/main.js',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
};
