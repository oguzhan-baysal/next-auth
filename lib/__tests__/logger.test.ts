import { logger, LogLevel, logAuth, logError, logPerformance, logSecurity } from '../logger';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

// Helper to set environment variables
const setEnv = (key: string, value: string) => {
  (process.env as any)[key] = value;
};

describe('Logger Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment for each test
    setEnv('NODE_ENV', 'test');
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('Log Levels', () => {
    it('should log error messages', () => {
      const error = new Error('Test error');
      logger.error('Test error message', { userId: '123' }, error);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('ERROR: Test error message')
      );
      expect(mockConsoleError).toHaveBeenCalledWith(error.stack);
    });

    it('should log warning messages', () => {
      logger.warn('Test warning', { component: 'auth' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('WARN: Test warning')
      );
    });

    it('should log info messages', () => {
      logger.info('Test info message', { action: 'login' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('INFO: Test info message')
      );
    });

    it('should log debug messages in development mode', () => {
      setEnv('NODE_ENV', 'development');
      logger.debug('Debug message', { debug: true });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('DEBUG: Debug message')
      );
    });

    it('should not log debug messages in production without DEBUG flag', () => {
      setEnv('NODE_ENV', 'production');
      setEnv('DEBUG', 'false');
      logger.debug('Debug message');

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('should log debug messages in production with DEBUG=true', () => {
      setEnv('NODE_ENV', 'production');
      setEnv('DEBUG', 'true');
      logger.debug('Debug message');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('DEBUG: Debug message')
      );
    });
  });

  describe('Production vs Development Output', () => {
    it('should output JSON in production mode', () => {
      setEnv('NODE_ENV', 'production');
      logger.info('Test message', { userId: '123' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/^\{.*\}$/) // JSON format
      );

      const loggedData = JSON.parse(mockConsoleLog.mock.calls[0][0]);
      expect(loggedData).toMatchObject({
        level: 'info',
        message: 'Test message',
        service: 'next-auth-app',
        userId: '123',
        timestamp: expect.any(String),
      });
    });

    it('should output human-readable format in development', () => {
      setEnv('NODE_ENV', 'development');
      logger.info('Test message', { userId: '123' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('INFO: Test message')
      );
    });
  });

  describe('Request Logging', () => {
    it('should log HTTP requests with duration', () => {
      const mockReq = {
        method: 'GET',
        url: '/api/test',
        headers: { 'user-agent': 'test-agent' },
        ip: '127.0.0.1',
      };

      const startTime = Date.now() - 100; // Simulate 100ms duration
      logger.request(mockReq, startTime);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('HTTP Request')
      );
    });

    it('should handle requests without IP address', () => {
      const mockReq = {
        method: 'POST',
        url: '/api/auth',
        headers: { 'user-agent': 'test-agent' },
        connection: { remoteAddress: '192.168.1.1' },
      };

      const startTime = Date.now();
      logger.request(mockReq, startTime);

      expect(mockConsoleLog).toHaveBeenCalled();
    });
  });

  describe('Authentication Logging', () => {
    it('should log authentication events', () => {
      logger.auth('login_success', 'user123', { ip: '127.0.0.1' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Auth: login_success')
      );
    });

    it('should log authentication events without userId', () => {
      logger.auth('login_attempt');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Auth: login_attempt')
      );
    });
  });

  describe('Performance Logging', () => {
    it('should log performance metrics', () => {
      logger.performance('database_query', 250, { query: 'SELECT * FROM users' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Performance: database_query')
      );
    });
  });

  describe('Security Logging', () => {
    it('should log security events with severity', () => {
      logger.security('failed_login_attempt', 'high', { 
        ip: '10.0.0.1', 
        attempts: 5 
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Security: failed_login_attempt')
      );
    });

    it('should handle all severity levels', () => {
      const severities: Array<'low' | 'medium' | 'high' | 'critical'> = 
        ['low', 'medium', 'high', 'critical'];

      severities.forEach(severity => {
        logger.security(`test_event_${severity}`, severity);
        expect(mockConsoleLog).toHaveBeenCalledWith(
          expect.stringContaining(`Security: test_event_${severity}`)
        );
      });
    });
  });

  describe('Helper Functions', () => {
    it('should use logError helper function', () => {
      const error = new Error('Helper test error');
      logError(error, 'Test context', { extra: 'data' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('ERROR: Test context')
      );
    });

    it('should use logAuth helper function', () => {
      logAuth('logout', 'user456', { sessionId: 'sess123' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Auth: logout')
      );
    });

    it('should use logPerformance helper function', () => {
      logPerformance('api_call', 150, { endpoint: '/api/users' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Performance: api_call')
      );
    });

    it('should use logSecurity helper function', () => {
      logSecurity('suspicious_activity', 'critical', { 
        reason: 'multiple_failed_attempts' 
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Security: suspicious_activity')
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle errors without stack trace', () => {
      const errorWithoutStack = { name: 'CustomError', message: 'No stack' } as Error;
      logger.error('Error without stack', {}, errorWithoutStack);

      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should handle undefined metadata gracefully', () => {
      logger.info('Message without metadata');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('INFO: Message without metadata')
      );
    });
  });

  describe('Log Entry Structure', () => {
    it('should create properly structured log entries', () => {
      setEnv('NODE_ENV', 'production');
      const testMetadata = { userId: '123', action: 'test' };
      
      logger.info('Structured test', testMetadata);

      const loggedData = JSON.parse(mockConsoleLog.mock.calls[0][0]);
      
      expect(loggedData).toHaveProperty('timestamp');
      expect(loggedData).toHaveProperty('level', 'info');
      expect(loggedData).toHaveProperty('message', 'Structured test');
      expect(loggedData).toHaveProperty('service', 'next-auth-app');
      expect(loggedData).toHaveProperty('userId', '123');
      expect(loggedData).toHaveProperty('action', 'test');
      
      // Timestamp should be valid ISO string
      expect(new Date(loggedData.timestamp).toISOString()).toBe(loggedData.timestamp);
    });
  });
}); 