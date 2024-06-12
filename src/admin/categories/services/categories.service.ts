import { Category } from '@/common/entities/category.entity';
import { Product } from '@/common/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from '../dto/UpdateCategoryDto.dto';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async createCategory(dto: CreateCategoryDto): Promise<void> {
    const parentCategory = await this.categoriesRepository.findOneBy({
      id: dto.parentCategoryId,
    });

    const newCategory = new Category();
    newCategory.name = dto.name;
    newCategory.parentCategory = parentCategory ? parentCategory : null;
    await this.categoriesRepository.save(newCategory);
  }

  async updateCategory(
    categoryId: number,
    dto: UpdateCategoryDto,
  ): Promise<void> {
    const category = await this.categoriesRepository.findOneBy({
      id: categoryId,
    });

    if (
      (dto.parentCategoryId && !category.parentCategory) ||
      (dto.parentCategoryId &&
        dto.parentCategoryId !== category.parentCategory.id)
    ) {
      category.parentCategory = await this.categoriesRepository.findOneBy({
        id: dto.parentCategoryId,
      });
    }
    if (dto.parentCategoryId === 0) {
      category.parentCategory = null;
    }

    category.name = dto.name;
    await this.categoriesRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoriesRepository.softDelete(id);
  }
}
