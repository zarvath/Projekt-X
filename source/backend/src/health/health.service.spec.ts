import { ServiceUnavailableException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  it('reports healthy database and Redis connections', async () => {
    const database = { checkConnection: vi.fn().mockResolvedValue(undefined) };
    const redis = { ping: vi.fn().mockResolvedValue('PONG') };
    const health = new HealthService(database as never, redis as never);

    await expect(health.check()).resolves.toEqual({
      status: 'ok',
      version: 'v1.0',
      checks: { mariadb: 'ok', redis: 'ok' },
    });
  });

  it('returns service unavailable when a dependency fails', async () => {
    const database = { checkConnection: vi.fn().mockRejectedValue(new Error('offline')) };
    const redis = { ping: vi.fn().mockResolvedValue('PONG') };
    const health = new HealthService(database as never, redis as never);

    await expect(health.check()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});