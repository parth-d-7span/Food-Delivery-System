import type { NextFunction, Request, Response } from "express";

import logger from "../config/logger.js";

const requestLogger = (request: Request, response: Response, next: NextFunction): void => {
  const start = Date.now();

  response.on("finish", () => {
    const duration = Date.now() - start;
    const message = `${request.method} ${request.originalUrl} ${response.statusCode} ${duration}ms`;

    if (response.statusCode >= 500) {
      logger.error(message);
    } else if (response.statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.info(message);
    }
  });

  next();
};

export default requestLogger;
