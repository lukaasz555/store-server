import { IsNotEmpty, IsNumber } from 'class-validator';
import { CategoryDto } from './Category.dto';

export class UpdateCategoryDto extends CategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id = 0;
}
