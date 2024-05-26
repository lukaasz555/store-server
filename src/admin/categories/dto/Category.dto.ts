import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  parentCategoryId = 0;
}
