import { Product } from '@/common/entities/product.entity';

export class GetProductsDto {
  id: number;
  title: string;
  stock: number;
  price: number;
  discountValueInPercent: number | null;
  discountValuePLN: number | null;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.discountValueInPercent = product.discountValueInPercent;
    this.discountValuePLN = product.discountValuePLN;
    this.price = product.price;
  }
}
