import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { RedisService } from '../cache/redis.service.js';

@Injectable()
export class HealthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly redis: RedisService,
  ) {}

  async check() {
    const [database, redis] = await Promise.allSettled([
      this.database.checkConnection(),
      this.redis.ping(),
    ]);
    const checks = {
      mariadb: database.status === 'fulfilled' ? 'ok' : 'error',
      redis: redis.status === 'fulfilled' && redis.value === 'PONG' ? 'ok' : 'error',
    };

    if (checks.mariadb !== 'ok' || checks.redis !== 'ok') {
      throw new ServiceUnavailableException({ status: 'error', checks });
    }

    return { status: 'ok', version: 'v1.0', checks };
  }
}