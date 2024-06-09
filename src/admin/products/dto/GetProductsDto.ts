import { Product } from '@/common/entities/product.entity';

export class GetProductsDto {
  readonly id: number;
  readonly title: string;
  readonly stock: number;
  readonly price: number;
  readonly categoryId: number;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.price = product.price;
    this.categoryId = product.category.id;
  }
}
