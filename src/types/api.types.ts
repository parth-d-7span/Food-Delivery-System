export interface ApiSuccessResponse<TData = undefined> {
  success: true;
  message: string;
  data?: TData;
}

export interface TokenResponse extends ApiSuccessResponse {
  token: string;
}
