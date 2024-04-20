import { DescriptionType } from '@/common/entities/product.entity';
import { PriceEUR } from '@/common/models/PriceEUR';
import { PricePLN } from '@/common/models/PricePLN';
import { PurchasePrice } from '@/common/models/PurchasePrice';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class EditProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsObject()
  @IsOptional()
  description: DescriptionType;

  @IsOptional()
  @Type(() => PricePLN)
  pricePLN: PricePLN;

  @IsOptional()
  @Type(() => PriceEUR)
  priceEUR: PriceEUR;

  @IsOptional()
  @Type(() => PurchasePrice)
  purchasePrice = new PurchasePrice();

  @IsOptional()
  @IsNumber()
  taxRate: number;

  @IsOptional()
  @IsNumber()
  discountValueInPercent: number | null;

  @IsOptional()
  @IsNumber()
  discountValuePLN: number | null;

  @IsOptional()
  @IsNumber()
  discountValueEUR: number | null;
}
