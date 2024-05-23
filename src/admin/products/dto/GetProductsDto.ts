import { Product } from '@/common/entities/product.entity';

export class GetProductsDto {
  id: number;
  title: string;
  stock: number;
  price: number;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.price = product.price;
  }
}
