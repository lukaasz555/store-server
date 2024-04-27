import { Product } from '@/common/entities/product.entity';

export class GetProductsDto {
  id: number;
  title: string;
  stock: number;
  pricePLN: number;
  priceEUR: number | null;
  discountValueInPercent: number | null;
  discountValuePLN: number | null;
  discountValueEUR: number | null;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.stock = product.stock;
    this.pricePLN = product.pricePLN.value;
    this.priceEUR = product.priceEUR?.value;
    this.discountValueInPercent = product.discountValueInPercent;
    this.discountValuePLN = product.discountValuePLN;
    this.discountValueEUR = product.discountValueEUR;
  }
}
