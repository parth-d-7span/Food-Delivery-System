import dotenv from "dotenv";

const scriptName = process.env.npm_lifecycle_event;
const configuredEnvironment = process.env.NODE_ENV;

let envFilePath = ".env.development";

if (configuredEnvironment === "production" || scriptName === "start") {
  envFilePath = ".env.production";
}

dotenv.config({ path: envFilePath });

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const API_PREFIX = process.env.API_PREFIX || "/api/v1";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
