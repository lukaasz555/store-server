import { Controller, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../common/entities/product.entity';
import { AddProductDto } from './dto/AddProduct.dto';
import { EditProductDto } from './dto/EditProduct.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/products')
@Controller('admin/products')
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

  @Post()
  addProduct(product: AddProductDto): Promise<void> {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  editProduct(product: EditProductDto): Promise<void> {
    return this.productsService.updateProduct(product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
