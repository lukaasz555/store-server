import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '@/common/entities/product.entity';
import { ProductsService } from './products.service';

// @ApiTags('store/products')
// @Controller('store/products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Get()
//   getProducts(): Promise<Product[]> {
//     return this.productsService.getProducts();
//   }

//   @Get(':id')
//   getProduct(@Param('id') id: number): Promise<Product> {
//     return this.productsService.getProduct(id);
//   }
// }

@ApiTags('store/products')
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
