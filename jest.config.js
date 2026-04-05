module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/__tests__/**',
  ],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.js'],
  verbose: true,
};
