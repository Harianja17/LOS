export interface CommonResponse<T> {
  code: number;
  status: string
  message: string;
  data: T
}
export interface CommonResponseList<T>{
  message: string;
  data: T[]
}
