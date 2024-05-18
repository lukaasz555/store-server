import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm/data-source/DataSource';
import { mockUsers } from './admin/users/data/users.mock';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { dataSourceOptions } from 'db/data-source';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { NotificationsModule } from './notifications/notifications.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { User } from './common/entities/user.entity';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    AdminModule,
    StoreModule,
    NotificationsModule,
    AccountModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
