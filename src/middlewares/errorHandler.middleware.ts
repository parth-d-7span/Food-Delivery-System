import { isHttpError, type HttpError } from "http-errors";
import type { NextFunction, Request, Response } from "express";

import logger from "../config/logger.js";

const errorHandler = (
  error: Error | HttpError,
  request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (isHttpError(error)) {
    if (error.statusCode >= 500) {
      logger.error(`${request.method} ${request.originalUrl} -> ${error.statusCode} ${error.message}`);
    } else {
      logger.warn(`${request.method} ${request.originalUrl} -> ${error.statusCode} ${error.message}`);
    }

    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  logger.error(`Unhandled Error: ${error.message}`, { stack: error.stack });

  return response.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
