import { NextRequest } from 'next/server';
import { GET } from '../../../src/app/api/health/route';

// Mock fetch for Auth0 health check
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock logger to avoid console output during tests
jest.mock('../../../lib/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('/api/health Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset process uptime for consistent testing
    jest.spyOn(process, 'uptime').mockReturnValue(3600); // 1 hour uptime
    jest.spyOn(process, 'memoryUsage').mockReturnValue({
      rss: 50 * 1024 * 1024, // 50MB
      heapTotal: 100 * 1024 * 1024, // 100MB
      heapUsed: 70 * 1024 * 1024, // 70MB (70% usage)
      external: 10 * 1024 * 1024, // 10MB
      arrayBuffers: 5 * 1024 * 1024, // 5MB
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Healthy System State', () => {
    it('should return healthy status when all checks pass', async () => {
      // Mock successful Auth0 response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ issuer: 'https://test-integration.auth0.com' }),
      });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        uptime: 3600,
        version: expect.any(String),
        environment: 'test',
        checks: {
          auth0: {
            status: 'healthy',
            responseTime: expect.any(Number),
          },
          database: {
            status: 'healthy',
            responseTime: expect.any(Number),
          },
          memory: {
            used: expect.any(Number),
            total: expect.any(Number),
            percentage: expect.any(Number),
          },
        },
      });

      // Verify Auth0 health check was called
      expect(mockFetch).toHaveBeenCalledWith(
        'https://test-integration.auth0.com/.well-known/openid_configuration',
        expect.objectContaining({
          method: 'GET',
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('should include proper memory calculations', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(data.checks.memory).toEqual({
        used: 70 * 1024 * 1024, // 70MB
        total: 100 * 1024 * 1024, // 100MB
        percentage: 70, // 70%
      });
    });
  });

  describe('Degraded System State', () => {
    it('should return degraded status when Auth0 is unhealthy', async () => {
      // Mock failed Auth0 response
      mockFetch.mockRejectedValueOnce(new Error('Auth0 connection failed'));

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200); // Still returns 200 for degraded
      expect(data.status).toBe('degraded');
      expect(data.checks.auth0).toMatchObject({
        status: 'unhealthy',
        responseTime: expect.any(Number),
        error: 'Auth0 connection failed',
      });
    });

    it('should return degraded status when memory usage is high', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      // Mock high memory usage (95%)
      jest.spyOn(process, 'memoryUsage').mockReturnValue({
        rss: 50 * 1024 * 1024,
        heapTotal: 100 * 1024 * 1024,
        heapUsed: 95 * 1024 * 1024, // 95% usage
        external: 10 * 1024 * 1024,
        arrayBuffers: 5 * 1024 * 1024,
      });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(data.status).toBe('degraded');
      expect(data.checks.memory.percentage).toBe(95);
    });
  });

  describe('Unhealthy System State', () => {
    it('should return unhealthy status when multiple checks fail', async () => {
      // Mock failed Auth0 response and database simulation failure
      mockFetch.mockRejectedValueOnce(new Error('Service unavailable'));

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(503); // Service Unavailable for unhealthy
      expect(data.status).toBe('unhealthy');
    });

    it('should handle Auth0 configuration errors', async () => {
      // Temporarily remove Auth0 config
      const originalIssuer = process.env.AUTH0_ISSUER_BASE_URL;
      delete process.env.AUTH0_ISSUER_BASE_URL;

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(data.checks.auth0).toMatchObject({
        status: 'unhealthy',
        error: 'AUTH0_ISSUER_BASE_URL not configured',
      });

      // Restore config
      process.env.AUTH0_ISSUER_BASE_URL = originalIssuer;
    });

    it('should handle Auth0 HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(data.checks.auth0).toMatchObject({
        status: 'unhealthy',
        error: 'Auth0 responded with status 500',
      });
    });

    it('should handle Auth0 timeout', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Request timeout'));

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(data.checks.auth0).toMatchObject({
        status: 'unhealthy',
        error: 'Request timeout',
      });
    });
  });

  describe('Caching Behavior', () => {
    it('should cache health check results', async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const request1 = new NextRequest('http://localhost:3000/api/health');
      const request2 = new NextRequest('http://localhost:3000/api/health');

      // First request
      const response1 = await GET(request1);
      const data1 = await response1.json();

      // Second request (should use cache)
      const response2 = await GET(request2);
      const data2 = await response2.json();

      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(data1.timestamp).toBe(data2.timestamp); // Same timestamp indicates cache hit

      // Auth0 should only be called once due to caching
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should refresh cache after TTL expires', async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const request = new NextRequest('http://localhost:3000/api/health');

      // First request
      const response1 = await GET(request);
      await response1.json();

      // Mock time passage (6 seconds > 5 second TTL)
      const originalNow = Date.now;
      Date.now = jest.fn(() => originalNow() + 6000);

      // Second request after TTL
      const response2 = await GET(request);
      await response2.json();

      expect(mockFetch).toHaveBeenCalledTimes(2);

      // Restore Date.now
      Date.now = originalNow;
    });
  });

  describe('Error Handling', () => {
    it('should handle unexpected errors gracefully', async () => {
      // Mock an error in the health check function itself
      jest.spyOn(process, 'uptime').mockImplementation(() => {
        throw new Error('Process error');
      });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data).toMatchObject({
        status: 'unhealthy',
        timestamp: expect.any(String),
        error: 'Health check failed',
      });
    });
  });

  describe('Response Format Validation', () => {
    it('should return valid ISO timestamp', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      const timestamp = new Date(data.timestamp);
      expect(timestamp.toISOString()).toBe(data.timestamp);
    });

    it('should include all required fields', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      // Required top-level fields
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('version');
      expect(data).toHaveProperty('environment');
      expect(data).toHaveProperty('checks');

      // Required check fields
      expect(data.checks).toHaveProperty('auth0');
      expect(data.checks).toHaveProperty('database');
      expect(data.checks).toHaveProperty('memory');
    });

    it('should have proper numeric types', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET(request);
      const data = await response.json();

      expect(typeof data.uptime).toBe('number');
      expect(typeof data.checks.memory.used).toBe('number');
      expect(typeof data.checks.memory.total).toBe('number');
      expect(typeof data.checks.memory.percentage).toBe('number');
    });
  });
}); 