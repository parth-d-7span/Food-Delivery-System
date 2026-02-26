import { isHttpError } from "http-errors";

import logger from "../config/logger.js";

const errorHandler = (err, req, res) => {
  if (isHttpError(err)) {
    if (err.status >= 500) {
      logger.error(`${req.method} ${req.originalUrl} → ${err.status} ${err.message}`);
    } else {
      logger.warn(`${req.method} ${req.originalUrl} → ${err.status} ${err.message}`);
    }

    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
