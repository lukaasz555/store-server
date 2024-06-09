import { GetProductsDto } from '../dto/GetProductsDto';

export const mockProducts: GetProductsDto[] = Array.from(
  { length: 34 },
  (_, i) => ({
    id: i + 1,
    title: `${i % 10 === 0 ? 'Test' : 'Product'} ${i + 1}`,
    stock: Math.floor(Math.random() * 36),
    price: Math.floor(Math.random() * (6500 - 100 + 1)) + 100,
    categoryId: Math.floor(Math.random() * 3 + 1),
  }),
);
