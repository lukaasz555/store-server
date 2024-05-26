import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCategoryDto } from './CreateCategory.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id = 0;
}
