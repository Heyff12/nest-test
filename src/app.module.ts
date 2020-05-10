import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphqlOptions } from './graphql.options'

@Module({
  imports: [
    CatsModule,
    ConfigModule.register({ folder: './config' }), 
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   installSubscriptionHandlers: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes('cats')
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
