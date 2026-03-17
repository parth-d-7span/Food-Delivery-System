import jwt from "jsonwebtoken";

import type { JwtPayload } from "../types/auth.types.js";

import { JWT_EXPIRES_IN, JWT_SECRET } from "./env.js";

const generateToken = (payload: JwtPayload): string =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;

export { generateToken, verifyToken };
