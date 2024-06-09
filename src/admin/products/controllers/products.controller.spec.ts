import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { mockProducts } from '../data/products.mock';
import { PaginationResult } from '@/common/models/Pagination';
import { GetProductDto } from '../dto/GetProductDto';
import { GetProductsDto } from '../dto/GetProductsDto';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const mockProductsService = {
      addProduct: jest.fn((dto) => ({ ...dto, id: 1 })),
      getProduct: jest.fn((id) => ({ id })),
      getProducts: jest.fn(({ page, limit, search }) => {
        const filteredItems = search
          ? mockProducts.filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase()),
            )
          : mockProducts;
        const items = filteredItems.slice((page - 1) * limit, page * limit);

        const res = new PaginationResult<GetProductsDto>();
        res
          .setItems(items)
          .setItemsCount(mockProducts.length)
          .setLimit(limit)
          .setPage(page)
          .setOffset((page - 1) * limit);

        return res;
      }),
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

  describe('getProducts controller', () => {
    it('should return array of products with default limit and page', async () => {
      const paginationResult = await controller.getProducts({});
      expect(paginationResult.items).toBeInstanceOf(Array);
      expect(paginationResult.limit).toBe(10);
      expect(paginationResult.page).toBe(1);
    });

    it('should return paginated results', async () => {
      const paginationResult = await controller.getProducts({
        page: 2,
        limit: 5,
      });
      expect(paginationResult.items).toBeInstanceOf(Array);
      expect(paginationResult.limit).toBe(5);
      expect(paginationResult.page).toBe(2);
      expect(paginationResult.offset).toBe(5);
    });

    it('should test search query param', async () => {
      const paginationResult = await controller.getProducts({
        search: 'test',
      });
      expect(paginationResult.items).toBeInstanceOf(Array);
      expect(paginationResult.items.length).toBeGreaterThan(0);
    });
  });

  describe('addProduct controller', () => {
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
  });

  describe('getProduct controller', () => {
    it('should return product with id = 7', async () => {
      const req = { params: { id: 7 } };
      const product = await controller.getProduct(req.params.id);
      expect(product.id).toBe(7);
    });
  });
});
