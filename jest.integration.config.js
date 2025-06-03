const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  displayName: 'Integration Tests',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.js'],
  testMatch: ['<rootDir>/tests/integration/**/*.test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',
    '<rootDir>/src/',
  ],
  collectCoverageFrom: [
    'src/app/api/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage/integration',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  // Handle module aliases
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testTimeout: 15000,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig); 