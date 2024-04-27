import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryParams } from '@/common/models/QueryParams';
import { PaginationResult } from '@/common/models/Pagination';
import { GetProductsDto } from './dto/GetProducts.dto';
import { GetProductDto } from './dto/GetProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getProducts(
    queryParams: QueryParams,
  ): Promise<PaginationResult<GetProductsDto>> {
    const { page, limit, search } = queryParams;
    const searchParams = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (search) {
      Object.assign(searchParams, { where: { title: Like(`%${search}%`) } });
    }

    const [entities, itemsCount] = await this.productsRepository.findAndCount({
      ...searchParams,
    });

    const result = new PaginationResult<GetProductsDto>();
    result
      .setItems(entities.map((product) => new GetProductsDto(product)))
      .setItemsCount(itemsCount)
      .setPagesCount(Math.ceil(itemsCount / limit))
      .setPage(page)
      .setLimit(limit)
      .setOffset(searchParams.skip);

    return result;
  }

  async getProduct(id: number): Promise<GetProductDto> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return new GetProductDto(product);
  }
}
