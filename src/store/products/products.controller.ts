import { Controller, Param, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '@/common/entities/product.entity';
import { ProductsService } from './products.service';
import { QueryParams } from '@/common/models/QueryParams';
import { PaginationResult } from '@/common/models/Pagination';
import { GetProductsDto } from './dto/GetProducts.dto';
import { GetProductDto } from './dto/GetProduct.dto';

@ApiTags('store/products')
@Controller('store/products')
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
}
