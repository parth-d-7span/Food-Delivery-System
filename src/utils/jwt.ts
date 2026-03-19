import Joi from "joi";
import jwt from "jsonwebtoken";

import ROLES from "../constants/roles.js";
import type { JwtPayload } from "../types/auth.types.js";

import { JWT_EXPIRES_IN, JWT_SECRET } from "./env.js";

const jwtPayloadSchema = Joi.object<JwtPayload>({
  id: Joi.string().trim().required().messages({
    "string.base": "Token id must be a string.",
    "string.empty": "Token id is required.",
    "any.required": "Token id is required.",
  }),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required()
    .messages({
      "string.base": "Token role must be a string.",
      "any.only": "Token role is invalid.",
      "any.required": "Token role is required.",
    }),
}).unknown(true);

const generateToken = (payload: JwtPayload): string =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const { error, value } = jwtPayloadSchema.validate(decoded);

  if (error) {
    throw new Error("Invalid token payload.");
  }

  return value;
};

export { generateToken, verifyToken };
