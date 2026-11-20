const required = [
  'MARIADB_HOST',
  'MARIADB_DATABASE',
  'MARIADB_USER',
  'MARIADB_PASSWORD',
  'REDIS_HOST',
  'REDIS_PASSWORD',
] as const;

function portValue(value: unknown, name: string, fallback: number): number {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65_535) {
    throw new Error(`${name} must be an integer between 1 and 65535`);
  }
  return parsed;
}

export function validateEnvironment(config: Record<string, unknown>) {
  for (const key of required) {
    if (typeof config[key] !== 'string' || config[key].length === 0) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  const apiHost = config.API_HOST ?? '127.0.0.1';
  if (typeof apiHost !== 'string' || apiHost.trim().length === 0) {
    throw new Error('API_HOST must be a non-empty string');
  }

  return {
    ...config,
    API_HOST: apiHost,
    API_PORT: portValue(config.API_PORT, 'API_PORT', 3001),
    MARIADB_PORT: portValue(config.MARIADB_PORT, 'MARIADB_PORT', 3306),
    REDIS_PORT: portValue(config.REDIS_PORT, 'REDIS_PORT', 6379),
  };
}