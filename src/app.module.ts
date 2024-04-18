import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm/data-source/DataSource';
import { mockUsers } from './admin/users/data/users.mock';
import { Product } from './common/entities/product.entity';
import { mockProducts } from './admin/products/data/products.mock';
import { Order } from './common/entities/order.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { NotificationsModule } from './notifications/notifications.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order],
      synchronize: process.env.NODE_ENV === 'production',
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    this.checkUsersCount();
  }

  private async checkUsersCount(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);
    const productsRepository = this.dataSource.getRepository(Product);
    const usersCount = await userRepository.count();
    const productsCount = await productsRepository.count();

    if (usersCount === 0) {
      mockUsers.forEach(async (user) => {
        await userRepository.save({
          ...user,
          createdAt: new Date(),
        });
      });
    }

    if (productsCount === 0) {
      mockProducts.forEach(async (p) => {
        await productsRepository.save(p);
      });
    }
  }
}
