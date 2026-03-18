import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ObjectSchema, Schema } from "joi";

import { BadRequest } from "../utils/errors.js";

type SchemaValue<TSchema extends Schema> = TSchema extends Schema<infer TValue> ? TValue : never;

const validateQuery = <TSchema extends ObjectSchema<unknown>>(
  schema: TSchema,
): RequestHandler =>
  (request: Request, _response: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(request.query, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(". ");
      next(BadRequest(message));
      return;
    }

    request.validatedQuery = value as SchemaValue<TSchema>;
    next();
  };

export default validateQuery;
