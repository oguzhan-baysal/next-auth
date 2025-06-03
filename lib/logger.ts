/**
 * Structured Logging System
 * 12-Factor App Principle: Treat logs as event streams
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  userId?: string;
  requestId?: string;
  duration?: number;
  metadata?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private service: string;
  private environment: string;

  constructor() {
    this.service = 'next-auth-app';
    this.environment = process.env.NODE_ENV || 'development';
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      ...metadata
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    return entry;
  }

  private output(entry: LogEntry): void {
    if (this.environment === 'production') {
      // Production: JSON structured logs to stdout
      console.log(JSON.stringify(entry));
    } else {
      // Development: Human readable format
      const timestamp = entry.timestamp;
      const level = entry.level.toUpperCase();
      const message = entry.message;
      const metadata = entry.metadata ? JSON.stringify(entry.metadata, null, 2) : '';
      
      console.log(`[${timestamp}] ${level}: ${message} ${metadata}`);
      
      if (entry.error) {
        console.error(entry.error.stack);
      }
    }
  }

  error(message: string, metadata?: Record<string, any>, error?: Error): void {
    this.output(this.createLogEntry(LogLevel.ERROR, message, metadata, error));
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.output(this.createLogEntry(LogLevel.WARN, message, metadata));
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.output(this.createLogEntry(LogLevel.INFO, message, metadata));
  }

  debug(message: string, metadata?: Record<string, any>): void {
    if (this.environment === 'development' || process.env.DEBUG === 'true') {
      this.output(this.createLogEntry(LogLevel.DEBUG, message, metadata));
    }
  }

  // Request logging middleware
  request(req: any, startTime: number, metadata?: Record<string, any>): void {
    const duration = Date.now() - startTime;
    this.info('HTTP Request', {
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection?.remoteAddress,
      duration,
      ...metadata
    });
  }

  // Authentication events
  auth(event: string, userId?: string, metadata?: Record<string, any>): void {
    this.info(`Auth: ${event}`, {
      userId,
      ...metadata
    });
  }

  // Performance monitoring
  performance(operation: string, duration: number, metadata?: Record<string, any>): void {
    this.info(`Performance: ${operation}`, {
      duration,
      ...metadata
    });
  }

  // Security events
  security(event: string, severity: 'low' | 'medium' | 'high' | 'critical', metadata?: Record<string, any>): void {
    this.warn(`Security: ${event}`, {
      severity,
      ...metadata
    });
  }
}

// Singleton logger instance
export const logger = new Logger();

// Helper functions for common use cases
export const logError = (error: Error, context?: string, metadata?: Record<string, any>) => {
  logger.error(context || 'Unhandled error', metadata, error);
};

export const logAuth = (event: string, userId?: string, metadata?: Record<string, any>) => {
  logger.auth(event, userId, metadata);
};

export const logRequest = (req: any, startTime: number, metadata?: Record<string, any>) => {
  logger.request(req, startTime, metadata);
};

export const logPerformance = (operation: string, duration: number, metadata?: Record<string, any>) => {
  logger.performance(operation, duration, metadata);
};

export const logSecurity = (event: string, severity: 'low' | 'medium' | 'high' | 'critical', metadata?: Record<string, any>) => {
  logger.security(event, severity, metadata);
}; 