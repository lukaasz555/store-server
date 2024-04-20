export class PaginationResult<T> {
  items: T[] = [];
  itemsCount = 0;
  limit = 10;
  offset = 0;
  page = 1;
  pagesCount = 0;

  setItems(items: T[]): this {
    this.items = items;
    return this;
  }

  setItemsCount(itemsCount: number): this {
    this.itemsCount = itemsCount;
    return this;
  }

  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  setOffset(offset: number): this {
    this.offset = offset;
    return this;
  }

  setPage(page: number): this {
    this.page = page;
    return this;
  }

  setPagesCount(pagesCount: number): this {
    this.pagesCount = pagesCount;
    return this;
  }
}
