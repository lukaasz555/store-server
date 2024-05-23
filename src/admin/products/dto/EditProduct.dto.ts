import { DescriptionType } from '@/common/entities/product.entity';
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
  price: number;

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
