export interface PageResponse<T> {
  data: T[];
  count: number;
  totalPage: number;
  page: number;
  size: number;
}
