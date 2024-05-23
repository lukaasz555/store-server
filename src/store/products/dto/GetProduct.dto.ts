import { DescriptionType, Product } from '@/common/entities/product.entity';

export class GetProductDto {
  id: number;
  title: string;
  stock: number;
  price: number;
  description: DescriptionType;
  discountValueInPercent: number | null;
  discountValuePLN: number | null;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.description = product.description;
    this.discountValueInPercent = product.discountValueInPercent;
    this.discountValuePLN = product.discountValuePLN;
    this.price = product.price;
  }
}
