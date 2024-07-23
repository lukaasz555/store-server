import { Category } from '@/common/entities/category.entity';

const parentCategories: Category[] = [
  {
    id: 1,
    name: 'Category Test #1',
    parentCategory: null,
    deletedAt: null,
    subcategories: [],
  },
  {
    id: 2,
    name: 'Category Test #2',
    parentCategory: null,
    deletedAt: null,
    subcategories: [],
  },
];

const childCategories: Category[] = [
  {
    id: 3,
    name: 'Subcategory Test #3',
    parentCategory: parentCategories[0],
    deletedAt: null,
    subcategories: [],
  },
  {
    id: 4,
    name: 'Subcategory Test #4',
    parentCategory: parentCategories[0],
    deletedAt: null,
    subcategories: [],
  },
  {
    id: 5,
    name: 'Subcategory Test #5',
    parentCategory: parentCategories[1],
    deletedAt: new Date(),
    subcategories: [],
  },
];

export const mockCategories: Category[] = [
  ...parentCategories,
  ...childCategories,
];
