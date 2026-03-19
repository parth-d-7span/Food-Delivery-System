import type { SignOptions } from "jsonwebtoken";

import dotenv from "dotenv";

const scriptName = process.env.npm_lifecycle_event;
const configuredEnvironment = process.env.NODE_ENV;

let envFilePath = ".env.development";

if (configuredEnvironment === "production" || scriptName === "start") {
  envFilePath = ".env.production";
}

dotenv.config({ path: envFilePath });

const getRequiredEnv = (key: "MONGO_URI" | "JWT_SECRET"): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const PORT = Number(process.env.PORT ?? 5000);
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const MONGO_URI = getRequiredEnv("MONGO_URI");
export const JWT_SECRET = getRequiredEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"];  //It tells TS: this value should match the expiresIn type used by jsonwebtoken.
export const API_PREFIX = process.env.API_PREFIX ?? "/api/v1";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
