import { Category } from '@/common/entities/category.entity';
import { Product } from '@/common/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async updateCategories(): Promise<void> {
    // const products = await this.productsRepository.find();
    // const categories = await this.categoriesRepository.find();
    // for (const [index, product] of products.entries()) {
    //   product.category = index % 2 === 0 ? categories[0] : categories[1];
    //   await this.productsRepository.save(product);
    // }
    // categories.forEach(async (c) => {
    //   if (!c.parentCategory) {
    //     c.parentCategory = null;
    //     await this.categoriesRepository.save(c);
    //   }
    // });
  }

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

  async deleteCategory(id: number): Promise<void> {
    await this.categoriesRepository.softDelete(id);
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
}
