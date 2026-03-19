import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ObjectSchema, Schema } from "joi";

import { BadRequest } from "../utils/errors.js";

type SchemaValue<TSchema extends Schema> = TSchema extends Schema<infer TValue> ? TValue : never;

const validate = <TSchema extends ObjectSchema<unknown>>(
  schema: TSchema,
): RequestHandler<Record<string, string>, unknown, SchemaValue<TSchema>> =>
  (request: Request, _response: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(request.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(". ");
      next(BadRequest(message));
      return;
    }

    request.body = value as SchemaValue<TSchema>;
    next();
  };

export default validate;
