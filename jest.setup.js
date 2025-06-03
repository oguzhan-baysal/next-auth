// Jest Test Setup
import '@testing-library/jest-dom';

// Mock Next.js router
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

// Mock Auth0 - only if module exists
try {
  jest.mock('@auth0/nextjs-auth0', () => ({
    useUser: () => ({
      user: null,
      error: null,
      isLoading: false,
      invalidate: async () => null,
    }),
    UserProvider: ({ children }) => children,
    withApiAuthRequired: (handler) => handler,
    withPageAuthRequired: (component) => component,
    getSession: jest.fn(),
    getAccessToken: jest.fn(),
  }));
} catch (error) {
  // Auth0 module might not be available in CI
  console.warn('Auth0 module not found, skipping mock');
}

// Mock Next.js Image component
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

// Mock environment variables
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

// Mock console methods in tests for cleaner output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: React.createFactory() is deprecated'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps has been renamed') ||
       args[0].includes('Auth0 module not found'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  if (global.fetch && jest.isMockFunction(global.fetch)) {
    global.fetch.mockClear();
  }
});

// Global test timeout
jest.setTimeout(15000); 