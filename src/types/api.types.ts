export interface PaginationMeta {
  page: number;
  limit: number;
  offset: number;
}

export interface ApiSuccessResponse<TData = undefined, TMeta = undefined> {
  success: true;
  message: string;
  data?: TData;
  meta?: TMeta;
}

export interface TokenResponse extends ApiSuccessResponse<{ token: string }> {}
