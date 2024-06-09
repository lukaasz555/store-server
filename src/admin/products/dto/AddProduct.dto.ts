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
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsNotEmpty()
  @IsObject()
  readonly description: DescriptionType;

  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  readonly purchasePriceInPLN: number;

  @IsNotEmpty()
  @IsNumber()
  readonly taxRate: number;

  @IsOptional()
  @IsNumber()
  readonly discountValueInPercent: number | null;

  @IsOptional()
  @IsNumber()
  readonly discountValuePLN: number | null;

  @IsNumber()
  readonly categoryId: number;
}
