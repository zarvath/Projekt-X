import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, type Pool } from 'mariadb';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor(config: ConfigService) {
    this.pool = createPool({
      host: config.getOrThrow<string>('MARIADB_HOST'),
      port: config.getOrThrow<number>('MARIADB_PORT'),
      database: config.getOrThrow<string>('MARIADB_DATABASE'),
      user: config.getOrThrow<string>('MARIADB_USER'),
      password: config.getOrThrow<string>('MARIADB_PASSWORD'),
      connectionLimit: 10,
      connectTimeout: 5_000,
    });
  }

  async checkConnection(): Promise<void> {
    await this.pool.query('SELECT 1');
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}