import { OrdersController } from './orders.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../common/entities/order.entity';
import { OrdersService } from './orders.service';
import { Product } from 'src/common/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
