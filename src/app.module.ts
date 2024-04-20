import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm/data-source/DataSource';
// import { mockUsers } from './admin/users/data/users.mock';
// import { mockProducts } from './admin/products/data/products.mock';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as dotenv from 'dotenv';
import { dataSourceOptions } from 'db/data-source';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { NotificationsModule } from './notifications/notifications.module';

dotenv.config();

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    this.checkUsersCount();
  }

  private async checkUsersCount(): Promise<void> {
    // const userRepository = this.dataSource.getRepository(User);
    // const productsRepository = this.dataSource.getRepository(Product);
    // const usersCount = await userRepository.count();
    // const productsCount = await productsRepository.count();
    // if (usersCount === 0) {
    //   mockUsers.forEach(async (user) => {
    //     await userRepository.save({
    //       ...user,
    //       createdAt: new Date(),
    //     });
    //   });
    // }
    // if (productsCount === 0) {
    //   mockProducts.forEach(async (p) => {
    //     await productsRepository.save(p);
    //   });
    // }
  }
}
