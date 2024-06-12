import { Product } from '@/common/entities/product.entity';
import { Category } from '@/common/entities/category.entity';

export const mockProducts: Product[] = Array.from({ length: 35 }, (_, i) => {
  const title = `${i % 10 === 0 ? 'Test' : 'Product'} ${i + 1}`;
  const price = Math.floor(Math.random() * (6500 - 100 + 1)) + 100;

  return {
    id: i + 1,
    title,
    stock: Math.floor(Math.random() * 36),
    price,
    purchasePriceInPLN: price - Math.floor(Math.random() * 100),
    categoryId: Math.floor(Math.random() * 3 + 1),
    taxRate: 23,
    description: {},
    discountValueInPercent:
      price > 2000 && price < 4000 ? Math.floor(Math.random() * 10) : null,
    discountValuePLN: price > 4500 ? Math.floor(Math.random() * 100) : null,
    category: new Category(),
  };
});
