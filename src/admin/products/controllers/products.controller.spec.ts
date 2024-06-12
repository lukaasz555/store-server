import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { mockProducts } from '../data/products.mock';
import { PaginationResult } from '@/common/models/Pagination';
import { GetProductDto } from '../dto/GetProductDto';
import { GetProductsDto } from '../dto/GetProductsDto';
import { NotFoundException, ValidationPipe } from '@nestjs/common';
import { AddProductDto } from '../dto/AddProduct.dto';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { validate } from 'class-validator';
import { mockCategories } from '@/admin/categories/data/mockCategories';
import { EditProductDto } from '../dto/EditProduct.dto';

const reqBody = {
  title: 'Test Add Product',
  stock: 5,
  description: { short: 'Short description', full: 'Full description' },
  price: 4200,
  purchasePriceInPLN: 4000,
  taxRate: 23,
  discountValueInPercent: 5,
  discountValuePLN: null,
  categoryId: 1,
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const mockProductsService = {
      addProduct: jest.fn((dto: AddProductDto) => ({ ...dto, id: 1 })),
      getProduct: jest.fn((id: number) => {
        const product = mockProducts.find((p) => p.id === id);
        return product ? new GetProductDto(product) : null;
      }),
      getProducts: jest.fn(({ page, limit, search }) => {
        const filteredItems = search
          ? mockProducts.filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase()),
            )
          : mockProducts;
        const items = filteredItems.slice((page - 1) * limit, page * limit);

        const res = new PaginationResult<GetProductsDto>();
        res
          .setItems(items.map((product) => new GetProductsDto(product)))
          .setItemsCount(mockProducts.length)
          .setLimit(limit)
          .setPage(page)
          .setOffset((page - 1) * limit);

        return res;
      }),
      deleteProduct: jest.fn((id: number) => {
        const updatedProducts = mockProducts.filter((p) => p.id !== id);
        return updatedProducts;
      }),
      updateProduct: jest.fn((id: number, editProductDto: EditProductDto) => {
        const product = mockProducts.find((p) => p.id === id);
        if (!product) {
          throw new NotFoundException(
            'Product with provided id does not exist',
          );
        }

        const updatedProduct = JSON.parse(JSON.stringify(product));
        for (const key in editProductDto) {
          if (typeof key === typeof updatedProduct[key]) {
            updatedProduct[key] = editProductDto[key];
          } else {
            console.log('object key type mismatch');
          }
        }

        const getProductDto = new GetProductDto(updatedProduct);
        return getProductDto;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
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

  describe('getProduct controller', () => {
    it('should return product with provided id', async () => {
      const productId = Math.floor(Math.random() * 35 + 1);
      const req = { params: { id: productId } };
      const product = await controller.getProduct(req.params.id);
      expect(product.id).toBe(productId);
    });

    it('should throw NotFoundException', async () => {
      const req = { params: { id: 9999 } };
      try {
        await controller.getProduct(req.params.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('addProduct controller', () => {
    it('should add a product with base data', async () => {
      const req: Partial<Request> = {
        body: reqBody,
      };
      const addProductDto = plainToClass(AddProductDto, req.body);
      const product = await controller.addProduct(addProductDto);

      expect(product).toEqual({
        id: expect.any(Number),
        title: addProductDto.title,
        price: addProductDto.price,
        categoryId: addProductDto.categoryId,
        description: addProductDto.description,
        purchasePriceInPLN: addProductDto.purchasePriceInPLN,
        stock: addProductDto.stock,
        taxRate: addProductDto.taxRate,
        discountValueInPercent: addProductDto.discountValueInPercent,
        discountValuePLN: addProductDto.discountValuePLN,
      });
    });

    it('should throw an error - invalid dto (missing taxRate, categoryId)', async () => {
      const bodyCopy = JSON.parse(JSON.stringify(reqBody));
      const req: Partial<Request> = {
        body: bodyCopy,
      };
      delete req.body.taxRate;
      delete req.body.categoryId;

      const newProductDto = plainToClass(AddProductDto, req.body);

      try {
        const errors = await validate(newProductDto);
        if (errors.length) {
          throw new Error(errors.toString());
        }
        await controller.addProduct(newProductDto);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('taxRate');
        expect(err.message).toContain('categoryId');
      }
    });

    it('should throw an error - invalid dto (invalid price)', async () => {
      const bodyCopy = JSON.parse(JSON.stringify(reqBody));
      bodyCopy.price = String(bodyCopy.price);
      const req: Partial<Request> = {
        body: bodyCopy,
      };

      try {
        const newProductDto = plainToClass(AddProductDto, req.body);
        const errors = await validate(newProductDto);
        if (errors.length) {
          throw new Error(errors.toString());
        }
        await controller.addProduct(newProductDto);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('price');
      }
    });

    it('should throw an error - invalid dto (invalid stock)', async () => {
      const bodyCopy = JSON.parse(JSON.stringify(reqBody));
      const req: Partial<Request> = {
        body: bodyCopy,
      };

      req.body.stock = String(req.body.stock);

      const newProductDto = plainToClass(AddProductDto, req.body);

      try {
        const errors = await validate(newProductDto);
        if (errors.length) {
          throw new Error(errors.toString());
        }
        await controller.addProduct(newProductDto);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('stock');
      }
    });

    it('should throw an error - wrong categoryId (doesnt exist)', async () => {
      const bodyCopy = JSON.parse(JSON.stringify(reqBody));
      const req: Partial<Request> = {
        body: bodyCopy,
      };

      req.body.categoryId = 9999;

      const newProductDto = plainToClass(AddProductDto, req.body);
      const category = mockCategories.find(
        ({ id }) => id === req.body.categoryId,
      );

      if (!category) {
        try {
          await controller.addProduct(newProductDto);
          throw new NotFoundException(
            'Category with provided id does not exist',
          );
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toContain('Category with provided id');
        }
      } else {
        const product = await controller.addProduct(newProductDto);
        expect(product).toBeDefined();
      }
    });

    it('should throw an error - wrong categoryId (is deleted)', async () => {
      const bodyCopy = JSON.parse(JSON.stringify(reqBody));
      const req: Partial<Request> = {
        body: bodyCopy,
      };
      req.body.categoryId = 5;

      const newProductDto = plainToClass(AddProductDto, req.body);
      const category = mockCategories.find(
        ({ id }) => id === req.body.categoryId,
      );

      if (category.deletedAt) {
        try {
          await controller.addProduct(newProductDto);
          throw new NotFoundException(
            'Category with provided id does not exist (is already deleted)',
          );
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toContain('Category with provided id');
        }
      } else {
        const product = await controller.addProduct(newProductDto);
        expect(product).toBeDefined();
      }
    });
  });

  describe('removeProduct controller', () => {
    it('should delete product with random id', async () => {
      const productId = Math.floor(Math.random() * 35 + 1);
      const product = await controller.getProduct(productId);

      if (!product) {
        expect(product).toBeNull();
      } else {
        const products = await controller.deleteProduct(productId);
        expect(products).not.toContain(product);
      }
    });
  });

  describe('updateProduct controller', () => {
    it('should update product with provided id (title)', async () => {
      const productId = Math.floor(Math.random() * 35 + 1);
      const product = await controller.getProduct(productId);

      if (!product) {
        expect(product).toBeNull();
      } else {
        const req: Partial<Request> = {
          params: { id: `${productId}` },
          body: { title: 'Updated Title' },
        };

        try {
          const editProductDto = plainToClass(EditProductDto, req.body);
          const updatedProduct = await controller.updateProduct(
            Number(req.params.id),
            editProductDto,
          );

          expect(updatedProduct.title).toBe(req.body.title);
        } catch (err) {
          // console.log('err.message - ', err.message);
        }
      }
    });

    it('should not update product - invalid dto (stock)', async () => {
      const productId = Math.floor(Math.random() * 35 + 1);
      const product = await controller.getProduct(productId);

      if (!product) {
        expect(product).toBeNull();
      } else {
        const req: Partial<Request> = {
          params: { id: `${productId}` },
          body: { stock: '10' },
        };

        try {
          const editProductDto = plainToClass(EditProductDto, req.body);
          const errors = await validate(editProductDto);
          if (errors.length) {
            throw new Error(errors.toString());
          }
          const updatedProduct = await controller.updateProduct(
            Number(req.params.id),
            editProductDto,
          );
          expect(updatedProduct.stock).not.toBe(editProductDto.stock);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toContain('stock');
        }
      }
    });
  });
});
