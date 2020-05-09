import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.func.middleware';
import { HttpExceptionFilter } from './common/exception/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
