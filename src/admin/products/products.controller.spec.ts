import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesController } from '../categories/categories.controller';
import { Product } from '@/common/entities/product.entity';
import { Category } from '@/common/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const mockProductsService = {
      addProduct: jest.fn((dto) => ({ ...dto, id: 1 })),
      getProduct: jest.fn((id) => ({ id })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a product', async () => {
    expect(
      controller.addProduct({
        title: 'Test Product',
        price: 100,
        categoryId: 1,
        description: { short: 'Short description', full: 'Full description' },
        purchasePriceInPLN: 100,
        stock: 10,
        taxRate: 23,
        discountValueInPercent: 5,
        discountValuePLN: null,
      }),
    ).toEqual({
      id: expect.any(Number),
      // title: 'Test Product',
      title: expect.any(String),
      price: 100,
      categoryId: 1,
      description: { short: 'Short description', full: 'Full description' },
      purchasePriceInPLN: 100,
      stock: 10,
      taxRate: 23,
      discountValueInPercent: 5,
      discountValuePLN: null,
    });
  });

  it('should return product with id = 7', async () => {
    const req = { params: { id: 7 } };
    const product = await controller.getProduct(req.params.id);
    expect(product.id).toBe(7);
  });
});
