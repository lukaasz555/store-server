import { DescriptionType } from '@/common/entities/product.entity';
import {
  IsNotEmpty,
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

  @IsNotEmpty()
  @IsObject()
  description: DescriptionType;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  purchasePriceInPLN: number;

  @IsNotEmpty()
  @IsNumber()
  taxRate: number;

  @IsOptional()
  @IsNumber()
  discountValueInPercent: number | null;

  @IsOptional()
  @IsNumber()
  discountValuePLN: number | null;

  @IsNumber()
  categoryId: number;
}
