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
    return this.productsRepository.find();
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (product) {
      return product;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async addProduct(product: AddProductDto): Promise<void> {
    const newProduct = await this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);
  }

  async updateProduct(updatedProduct: EditProductDto): Promise<void> {
    const product = await this.productsRepository.findOneBy({
      id: updatedProduct.id,
    });
    if (product) {
      await this.productsRepository.update(updatedProduct.id, updatedProduct);
    } else {
      throw new NotFoundException('Product not found');
    }
  }
  async deleteProduct(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
