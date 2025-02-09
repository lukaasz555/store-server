import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult } from '@/common/models/Pagination';
import { QueryParams } from '@/common/models/QueryParams';
import { Category } from '@/common/entities/category.entity';
import { Product } from '@/common/entities/product.entity';
import { GetProductsDto } from '../dto/GetProductsDto';
import { GetProductDto } from '../dto/GetProductDto';
import { AddProductDto } from '../dto/AddProduct.dto';
import { EditProductDto } from '../dto/EditProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
      relations: ['category'],
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
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Product not found');
    const productDto = new GetProductDto(product);
    return productDto;
  }

  async addProduct(addProductDto: AddProductDto): Promise<void> {
    const newProduct = this.productsRepository.create(addProductDto);
    const category = await this.categoryRepository.findOne({
      where: { id: addProductDto.categoryId },
    });

    if (!category) throw new NotFoundException('Category not found');

    newProduct.category = category;

    await this.productsRepository.save({
      ...newProduct,
      pricesHistory: [],
    });
  }

  async updateProduct(
    id: number,
    editProductDto: EditProductDto,
  ): Promise<GetProductDto> {
    const product = await this.productsRepository.findOneBy({
      id,
    });
    if (!product) throw new NotFoundException('Product not found');
    await this.productsRepository.update(id, editProductDto);

    const updatedProduct = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    const dto = new GetProductDto(updatedProduct);
    return dto;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productsRepository.softDelete(id);
  }
}
