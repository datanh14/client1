export interface Pagination {
  page?: number;
  totalResults?: number;
  pageSize?: number;
}

export interface PaginationFilter {
  page: number;
  pageSize: number;
}

export const defaultPagination: Pagination = {};

export const defaultPaginationFilter: PaginationFilter = {
  page: 0,
  pageSize: 10,
};
