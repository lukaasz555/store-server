import { DescriptionType } from '@/common/entities/product.entity';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class EditProductDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  readonly stock: number;

  @IsObject()
  @IsOptional()
  readonly description: DescriptionType;

  @IsOptional()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly taxRate: number;

  @IsOptional()
  @IsNumber()
  readonly discountValueInPercent: number | null;

  @IsOptional()
  @IsNumber()
  readonly discountValuePLN: number | null;

  @IsOptional()
  @IsNumber()
  readonly discountValueEUR: number | null;
}
