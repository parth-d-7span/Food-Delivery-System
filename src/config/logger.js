import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { NODE_ENV } from "../utils/env.js";

// ─── Log Format ───────────────────────────────────────────────────────────────
// Combines timestamp + colorized level + message into one readable line
// Example: 2024-01-01 10:00:00 [INFO] : Server started
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }), // include stack trace on errors
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}] : ${message}\n${stack}`;
    }
    return `${timestamp} [${level.toUpperCase()}] : ${message}`;
  }),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level}] : ${message}\n${stack}`;
    }
    return `${timestamp} [${level}] : ${message}`;
  }),
);

// ─── Daily Rotate File — Error Logs ──────────────────────────────────────────
// Writes only error level logs to logs/error-YYYY-MM-DD.log
// Keeps logs for 30 days, max 20MB per file
const errorFileTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "30d",
  maxSize: "20m",
  format: logFormat,
});

// ─── Daily Rotate File — Combined Logs ───────────────────────────────────────
// Writes all logs (info, warn, error) to logs/combined-YYYY-MM-DD.log
const combinedFileTransport = new DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  maxSize: "20m",
  format: logFormat,
});

// ─── Logger Instance ──────────────────────────────────────────────────────────
const logger = winston.createLogger({
  level: NODE_ENV === "production" ? "warn" : "info",
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    errorFileTransport,
    combinedFileTransport,
  ],
  exitOnError: false,
});

export default logger;
