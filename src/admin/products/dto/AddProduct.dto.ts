import { DescriptionType } from '@/common/entities/product.entity';
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
  price: number;

  @IsNotEmpty()
  purchasePrice: number;

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
