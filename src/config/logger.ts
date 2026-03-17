import winston, { format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { NODE_ENV } from "../utils/env.js";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }), 
  format.printf(({ timestamp , level, message, stack }) => {  //parameters are implicitly typed by Winston's
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}] : ${message}\n${stack}`;
    }

    return `${timestamp} [${level.toUpperCase()}] : ${message}`;
  }),
);

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level}] : ${message}\n${stack}`;
    }

    return `${timestamp} [${level}] : ${message}`;
  }),
);

const errorFileTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "30d",
  maxSize: "20m",
  format: logFormat,
});

const combinedFileTransport = new DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  maxSize: "20m",
  format: logFormat,
});

const logger: Logger = winston.createLogger({
  level: NODE_ENV === "production" ? "warn" : "info",
  transports: [
    new transports.Console({ format: consoleFormat }),
    errorFileTransport,
    combinedFileTransport,
  ],
  exitOnError: false,
});

export default logger;