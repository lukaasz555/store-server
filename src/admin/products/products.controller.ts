import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
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
  addProduct(@Body() addProductDto: AddProductDto): Promise<void> {
    return this.productsService.addProduct(addProductDto);
  }

  @Put(':id')
  editProduct(
    @Param('id') id: number,
    @Body() editProductDto: EditProductDto,
  ): Promise<void> {
    return this.productsService.updateProduct(id, editProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
