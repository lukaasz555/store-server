import { Category } from '@/common/entities/category.entity';
import { DescriptionType, Product } from '@/common/entities/product.entity';

export class GetProductDto {
  id: number;
  title: string;
  stock: number;
  purchasePriceInPLN: number;
  taxRate: number;
  price: number;
  discountValueInPercent: number | null;
  discountValuePLN: number | null;
  category = new Category();
  description: DescriptionType = {};

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.price = product.price;
    this.purchasePriceInPLN = product.purchasePriceInPLN;
    this.taxRate = product.taxRate;
    this.discountValueInPercent = product.discountValueInPercent;
    this.discountValuePLN = product.discountValuePLN;
    this.category = product.category;
    this.description = product.description;
  }
}
