// import { Category } from '@/common/entities/category.entity';
import { DescriptionType, Product } from '@/common/entities/product.entity';

export class GetProductDto {
  readonly id: number;
  readonly title: string;
  readonly stock: number;
  readonly purchasePriceInPLN: number;
  readonly taxRate: number;
  readonly price: number;
  readonly discountValueInPercent: number | null;
  readonly discountValuePLN: number | null;
  readonly categoryId: number;
  readonly description: DescriptionType = {};

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.price = product.price;
    this.purchasePriceInPLN = product.purchasePriceInPLN;
    this.taxRate = product.taxRate;
    this.discountValueInPercent = product.discountValueInPercent;
    this.discountValuePLN = product.discountValuePLN;
    // this.category = product.category;
    this.categoryId = product.category.id;
    this.description = product.description;
  }
}
