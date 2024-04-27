import { DescriptionType, Product } from '@/common/entities/product.entity';
import { Price } from '@/common/models/Price';

export class GetProductDto {
  id: number;
  title: string;
  stock: number;
  pricePLN: number;
  priceEUR: number | null;
  pricesHistory: Price[];
  description: DescriptionType;
  discountValueInPercent: number | null;
  discountValuePLN: number | null;
  discountValueEUR: number | null;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.pricePLN = product.pricePLN.value;
    this.priceEUR = product.priceEUR?.value;
    this.pricesHistory = product.pricesHistory;
    this.description = product.description;
    this.discountValueInPercent = product.discountValueInPercent;
    this.discountValuePLN = product.discountValuePLN;
    this.discountValueEUR = product.discountValueEUR;
  }
}
