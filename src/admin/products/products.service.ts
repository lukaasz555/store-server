import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { AddProductDto } from './dto/AddProduct.dto';
import { EditProductDto } from './dto/EditProduct.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProductsDto } from './dto/GetProductsDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<GetProductsDto[]> {
    const products = await this.productsRepository.find();
    return products.map((product) => new GetProductsDto(product));
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
