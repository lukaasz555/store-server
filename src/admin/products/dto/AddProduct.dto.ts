import { DescriptionType } from '@/common/entities/product.entity';
import { PriceEUR } from '@/common/models/PriceEUR';
import { PricePLN } from '@/common/models/PricePLN';
import { PurchasePrice } from '@/common/models/PurchasePrice';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  // @IsNumber()
  // @IsNotEmpty()
  // categoryId: number;

  @IsNotEmpty()
  @IsObject()
  description: DescriptionType;

  @IsNotEmptyObject()
  @Type(() => PricePLN)
  pricePLN: PricePLN;

  @IsOptional()
  @Type(() => PriceEUR)
  priceEUR: PriceEUR;

  @IsNotEmpty()
  @Type(() => PurchasePrice)
  purchasePrice = new PurchasePrice();

  @IsNotEmpty()
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
