const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',
    '<rootDir>/src/app/__tests__/', // Skip component tests temporarily
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testTimeout: 15000,
  maxWorkers: 1,
  forceExit: true,
  detectOpenHandles: true,
  // Additional CI-specific settings
  silent: process.env.CI === 'true',
  verbose: process.env.CI !== 'true',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig); 