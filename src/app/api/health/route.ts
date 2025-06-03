import { NextRequest, NextResponse } from 'next/server';
import { logger } from '../../../../lib/logger';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    auth0: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
    database: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
  };
}

// Cache for health check results (5 seconds)
let healthCache: { data: HealthStatus; timestamp: number } | null = null;
const CACHE_TTL = 5000; // 5 seconds

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  
  try {
    // Return cached result if available and fresh
    if (healthCache && (Date.now() - healthCache.timestamp) < CACHE_TTL) {
      logger.debug('Health check served from cache');
      return NextResponse.json(healthCache.data, { status: 200 });
    }

    // Perform health checks
    const healthStatus = await performHealthChecks();
    
    // Cache the result
    healthCache = {
      data: healthStatus,
      timestamp: Date.now()
    };

    const duration = Date.now() - startTime;
    logger.info('Health check completed', { 
      status: healthStatus.status,
      duration,
      authStatus: healthStatus.checks.auth0.status,
      databaseStatus: healthStatus.checks.database.status,
      memoryUsage: healthStatus.checks.memory.percentage
    });

    const statusCode = healthStatus.status === 'healthy' ? 200 : 
                      healthStatus.status === 'degraded' ? 200 : 503;

    return NextResponse.json(healthStatus, { status: statusCode });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Health check failed', { duration }, error as Error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    }, { status: 503 });
  }
}

async function performHealthChecks(): Promise<HealthStatus> {
  const startTime = Date.now();
  
  // Basic system info
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  // Parallel health checks for better performance
  const [auth0Check, databaseCheck] = await Promise.allSettled([
    checkAuth0Health(),
    checkDatabaseHealth()
  ]);

  const healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime,
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      auth0: auth0Check.status === 'fulfilled' ? auth0Check.value : {
        status: 'unhealthy',
        error: auth0Check.status === 'rejected' ? auth0Check.reason.message : 'Unknown error'
      },
      database: databaseCheck.status === 'fulfilled' ? databaseCheck.value : {
        status: 'unhealthy', 
        error: databaseCheck.status === 'rejected' ? databaseCheck.reason.message : 'Unknown error'
      },
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
        percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100)
      }
    }
  };

  // Determine overall status
  const healthChecks = [healthStatus.checks.auth0, healthStatus.checks.database];
  const failedChecks = healthChecks.filter(check => check.status === 'unhealthy').length;

  if (failedChecks > 0) {
    healthStatus.status = failedChecks === 1 ? 'degraded' : 'unhealthy';
  }

  // Memory pressure check
  if (healthStatus.checks.memory.percentage > 90) {
    healthStatus.status = healthStatus.status === 'healthy' ? 'degraded' : 'unhealthy';
    logger.warn('High memory usage detected', { 
      memoryPercentage: healthStatus.checks.memory.percentage 
    });
  }

  return healthStatus;
}

async function checkAuth0Health(): Promise<{ status: 'healthy' | 'unhealthy'; responseTime?: number; error?: string }> {
  const startTime = Date.now();
  
  try {
    // Check Auth0 issuer URL is accessible
    const issuerUrl = process.env.AUTH0_ISSUER_BASE_URL;
    if (!issuerUrl) {
      throw new Error('AUTH0_ISSUER_BASE_URL not configured');
    }

    const response = await fetch(`${issuerUrl}/.well-known/openid_configuration`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Auth0 responded with status ${response.status}`);
    }

    return {
      status: 'healthy',
      responseTime: Date.now() - startTime
    };
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function checkDatabaseHealth(): Promise<{ status: 'healthy' | 'unhealthy'; responseTime?: number; error?: string }> {
  const startTime = Date.now();
  
  try {
    // Since we're using Auth0 as our user store, we don't have a traditional database
    // This is a placeholder for when you add a database later
    
    // Simulate a database check
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime
    };
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 