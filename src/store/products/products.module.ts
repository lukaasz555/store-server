import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from 'src/common/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@/common/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
