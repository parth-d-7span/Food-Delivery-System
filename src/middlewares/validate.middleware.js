import { BadRequest } from "../utils/errors.js";

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(". ");
    return next(BadRequest(message));
  }

  req.body = value;
  next();
};

export default validate;