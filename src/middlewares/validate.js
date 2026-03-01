import createError from "http-errors";
import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.errors.map((err) => err.message).join(" ");

      return next(createError.BadRequest(message));
    }

    req.body = result.data;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(createError.BadRequest(error.message));
    }
    next(error);
  }
};


export default validate;
