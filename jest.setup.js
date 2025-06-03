// Jest Test Setup for CI/Local environments
try {
  require('@testing-library/jest-dom');
} catch (error) {
  console.warn('Testing library jest-dom not available:', error.message);
}

// Suppress specific warnings in CI
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
     args[0].includes('Warning: React.createFactory() is deprecated') ||
     args[0].includes('Console Ninja'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('componentWillReceiveProps has been renamed') ||
     args[0].includes('Auth0 module not found') ||
     args[0].includes('Console Ninja'))
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};

// Mock Next.js modules safely
try {
  jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }),
    useSearchParams: () => ({
      get: jest.fn(),
    }),
    usePathname: () => '/',
  }));
} catch (error) {
  console.warn('Next.js navigation mock failed:', error.message);
}

// Mock Auth0 safely
try {
  jest.mock('@auth0/nextjs-auth0', () => ({
    useUser: () => ({
      user: null,
      error: null,
      isLoading: false,
      checkSession: jest.fn(),
    }),
    UserProvider: ({ children }) => children,
    withApiAuthRequired: (handler) => handler,
    withPageAuthRequired: (component) => component,
    getSession: jest.fn(),
    getAccessToken: jest.fn(),
  }));
} catch (error) {
  console.warn('Auth0 mock setup failed:', error.message);
}

// Mock Next.js Image component safely
try {
  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
      try {
        const { createElement } = require('react');
        return createElement('img', props);
      } catch {
        return null;
      }
    },
  }));
} catch (error) {
  console.warn('Next.js Image mock failed:', error.message);
}

// Environment variables setup
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'test-secret-minimum-32-characters-long';
process.env.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || 'test-client-id';
process.env.AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || 'test-client-secret';
process.env.AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL || 'https://test.auth0.com';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Mock fetch globally
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Test timeout for CI environments
jest.setTimeout(process.env.CI ? 30000 : 15000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  if (global.fetch && jest.isMockFunction(global.fetch)) {
    global.fetch.mockClear();
  }
}); 