// Integration Test Setup
const { setGlobalOrigin } = require('@whatwg-node/fetch');

// Polyfill for Node.js environment
if (!global.Request) {
  const { Request, Response, Headers, fetch } = require('@whatwg-node/fetch');
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
  global.fetch = fetch;
}

// Set up global fetch for Node.js environment
if (!global.fetch) {
  setGlobalOrigin('http://localhost:3000');
}

// Mock environment variables for integration tests
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'integration-test-secret-min-32-characters-long';
process.env.AUTH0_CLIENT_ID = 'integration-test-client-id';
process.env.AUTH0_CLIENT_SECRET = 'integration-test-client-secret';
process.env.AUTH0_ISSUER_BASE_URL = 'https://test-integration.auth0.com';
process.env.NODE_ENV = 'test';

// Increase timeout for integration tests
jest.setTimeout(30000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Global test helpers
global.testHelpers = {
  createMockRequest: (method = 'GET', url = '/api/test', headers = {}) => ({
    method,
    url,
    headers: {
      'content-type': 'application/json',
      'user-agent': 'jest-test-agent',
      ...headers,
    },
    nextUrl: {
      pathname: url,
    },
  }),

  createMockResponse: () => ({
    json: jest.fn(),
    status: jest.fn(),
    headers: new Map(),
  }),
}; 