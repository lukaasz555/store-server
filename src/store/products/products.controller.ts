import { Controller, Param, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../common/entities/product.entity';

@Controller('store/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProduct(id);
  }
}
