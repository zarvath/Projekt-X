import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.useLogger(new Logger());
  app.enableShutdownHooks();
  app.useWebSocketAdapter(
    new WsAdapter(app, { maxPayload: 256 * 1024, maxSendBufferSize: 1024 * 1024 }),
  );

  const host = config.getOrThrow<string>('API_HOST');
  const port = config.getOrThrow<number>('API_PORT');
  await app.listen(port, host);
  new Logger('Bootstrap').log(`Infrastructure API listening on http://${host}:${port}`);
}

await bootstrap();