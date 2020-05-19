import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsMongoModule } from './catsMongo/catsMongo.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigModule } from './configModule/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphqlOptions } from './graphql.options'
import { EventsModule } from './events/events.module';
import { MathModule } from './math/math.module';

const mongo_url = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/nest' : 'mongodb://mongo_db/nest'

@Module({
  imports: [
    CatsModule,
    CatsMongoModule,
    ConfigModule.register({ folder: './config' }), 
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot(mongo_url),
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   installSubscriptionHandlers: true,
    // }),
    EventsModule,
    MathModule
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
