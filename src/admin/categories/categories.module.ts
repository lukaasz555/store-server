import { Module } from '@nestjs/common';
import { Category } from '@/common/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/common/entities/product.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
