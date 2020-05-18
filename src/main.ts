import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// import * as compression from 'compression';
// import * as helmet from 'helmet';
// import * as csurf from 'csurf';
// import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.func.middleware';
import { HttpExceptionFilter } from './common/exception/http-exception.filter'
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'],
  });
  //微服务
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  await app.startAllMicroservicesAsync();
  //报错------
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  // app.use(csurf());
  // app.use(compression)
  // app.use(helmet())

  //normal
  app.use(logger);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // app.useGlobalFilters(new HttpExceptionFilter());  //全局报错

  await app.listen(3001);



  // const app = await NestFactory.createMicroservice(AppModule, {
  //   logger: ['error', 'warn'],
  //   transport: Transport.TCP,
  // });
  // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
