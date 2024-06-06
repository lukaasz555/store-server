import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const mockProductsService = {
      addProduct: jest.fn((dto) => ({ ...dto, id: 1 })),
      getProduct: jest.fn((id) => ({ id })),
      getProducts: jest.fn(({}) => ({ items: [], limit: 10 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
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

  it('should return empty array of products with default limit', async () => {
    const products = await controller.getProducts({});
    expect(products.items).toEqual([]);
    expect(products.limit).toBe(10);
  });
});
