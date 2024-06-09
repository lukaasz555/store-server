import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { AddProductDto } from '../dto/AddProduct.dto';
import { EditProductDto } from '../dto/EditProduct.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetProductsDto } from '../dto/GetProductsDto';
import { PaginationResult } from '@/common/models/Pagination';
import { QueryParams } from '@/common/models/QueryParams';
import { GetProductDto } from '../dto/GetProductDto';

@ApiTags('admin/products')
@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() query): Promise<PaginationResult<GetProductsDto>> {
    const queryParams = new QueryParams(query);
    return this.productsService.getProducts(queryParams);
  }

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<GetProductDto> {
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
