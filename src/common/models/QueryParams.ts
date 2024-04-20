export class QueryParams {
  page: number;
  limit: number;
  search: string | undefined;

  constructor(query: Record<string, string>) {
    this.page = +query.page || 1;
    this.limit = +query.limit || 10;
    this.search = query.search;
  }
}
