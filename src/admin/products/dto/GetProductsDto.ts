import { Product } from '@/common/entities/product.entity';

export class GetProductsDto {
  id: number;
  title: string;
  stock: number;
  pricePLN: number;
  priceEUR: number | null;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.pricePLN = product.pricePLN.value;
    this.priceEUR = product.priceEUR ? product.priceEUR.value : null;
  }
}
