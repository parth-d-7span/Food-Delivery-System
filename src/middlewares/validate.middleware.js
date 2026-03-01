import ApiError from "../utils/ApiError.js";

const validate = (schema) => {

  return (req, res, next) => {
    let error;

    // Joi-style schema has a validate() method
    if (schema && typeof schema.validate === "function") {
      ({ error } = schema.validate(req.body));
    } else if (schema && typeof schema.safeParse === "function") {
      // Zod-style schema uses safeParse
      const result = schema.safeParse(req.body);
      if (!result.success) {
        error = {
          details: result.error.issues.map((issue) => ({ message: issue.message })),
        };
      }
    } else if (schema && typeof schema.parse === "function") {
      // generic parse-only schema (Zod without safeParse)
      try {
        schema.parse(req.body);
      } catch (err) {
        error = {
          details: err.errors || [{ message: err.message }],
        };
      }
    } else {
      return next(new ApiError(500, "Invalid validation schema provided"));
    }

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };

};

export default validate;