import type { Response } from "express";

import type { ApiErrorResponse, ApiSuccessResponse } from "../types/api.types.js";

const successResponse = <TData = undefined, TMeta = undefined>(
  response: Response,
  statusCode: number,
  body: ApiSuccessResponse<TData, TMeta>,
): Response<ApiSuccessResponse<TData, TMeta>> => response.status(statusCode).json(body);

const errorResponse = (
  response: Response,
  statusCode: number,
  message: string,
): Response<ApiErrorResponse> =>
  response.status(statusCode).json({
    success: false,
    message,
  });

export { errorResponse, successResponse };
