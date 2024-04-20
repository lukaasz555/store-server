import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { AddProductDto } from './dto/AddProduct.dto';
import { EditProductDto } from './dto/EditProduct.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProductsDto } from './dto/GetProductsDto';
import { PaginationResult } from '@/common/models/Pagination';
import { QueryParams } from '@/common/models/QueryParams';

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

    if (search.trim() !== '') {
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

  async getProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async addProduct(addProductDto: AddProductDto): Promise<void> {
    const newProduct = this.productsRepository.create(addProductDto);
    await this.productsRepository.save({
      ...newProduct,
      pricesHistory: [],
    });
  }

  async updateProduct(
    id: number,
    editProductDto: EditProductDto,
  ): Promise<void> {
    const product = await this.productsRepository.findOneBy({
      id,
    });
    if (!product) throw new NotFoundException('Product not found');
    await this.productsRepository.update(id, editProductDto);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productsRepository.softDelete(id);
  }
}
