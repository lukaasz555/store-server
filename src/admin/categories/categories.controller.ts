import { Category } from '@/common/entities/category.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto.dto';

@ApiTags('admin/categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/update')
  updateCategories(): Promise<void> {
    return this.categoriesService.updateCategories();
  }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post()
  createCategory(@Body() dto: CreateCategoryDto): Promise<void> {
    console.log('body dto in controller', dto);
    return this.categoriesService.createCategory(dto);
  }

  @Put(':id')
  updateCategory(
    @Param('id') categoryId: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<void> {
    console.log(
      'object dto updateCategory controller',
      dto,
      ' paramId',
      categoryId,
    );
    return this.categoriesService.updateCategory(categoryId, dto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
