import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { AddProductDto } from './dto/AddProduct.dto';
import { EditProductDto } from './dto/EditProduct.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      return this.productsRepository.find();
    } catch (err) {
      throw new Error('GetProducts error');
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (product) return product;
      else throw new NotFoundException('Product not found');
    } catch (err) {
      throw new Error('GetProduct error');
    }
  }

  async addProduct(addProductDto: AddProductDto): Promise<void> {
    try {
      const newProduct = this.productsRepository.create(addProductDto);
      await this.productsRepository.save({
        ...newProduct,
        pricesHistory: [],
      });
    } catch (err) {
      throw new Error('AddProduct error');
    }
  }

  async updateProduct(
    id: number,
    editProductDto: EditProductDto,
  ): Promise<void> {
    try {
      const product = await this.productsRepository.findOneBy({
        id,
      });
      if (!product) throw new NotFoundException('Product not found');
      await this.productsRepository.update(id, editProductDto);
    } catch (err) {
      throw new Error('UpdateProduct error');
    }
  }

  async deleteProduct(id: number): Promise<void> {
    //* It's temp solution - will be replaced with soft delete
    try {
      await this.productsRepository.delete(id);
    } catch (err) {
      throw new Error('DeleteProduct error');
    }
  }
}
