export interface PageResponse<T> {
  data: T[];
  count: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface PageResponseSingle<T> {
  data: T;
  count: number;
  totalPage: number;
  page: number;
  size: number;
}
