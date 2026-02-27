import createError from "http-errors";
import validator from "validator";

const PASSWORD_MIN_LENGTH = 8;

const validateRegister = (req, res, next) => {
  const { name, email, password, phoneNumber, address, role } = req.body;

  if (!name || !email || !password || !phoneNumber || !address) {
    return next(createError.BadRequest("All fields are required: name, email, password, phoneNumber, address."));
  }

  if (name.trim().length < 2) {
    return next(createError.BadRequest("Name must be at least 2 characters."));
  }

  // validator.isEmail checks format like x@x.x — no manual regex needed
  if (!validator.isEmail(email)) {
    return next(createError.BadRequest("Please provide a valid email address."));
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return next(createError.BadRequest(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`));
  }

  if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
    return next(createError.BadRequest("Please provide a valid 10-digit phone number."));
  }

  if (address.trim().length < 5) {
    return next(createError.BadRequest("Address must be at least 5 characters."));
  }

  if (role && !["customer", "admin"].includes(role)) {
    return next(createError.BadRequest("Role must be either customer or admin."));
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError.BadRequest("Email and password are required."));
  }

  if (!validator.isEmail(email)) {
    return next(createError.BadRequest("Please provide a valid email address."));
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return next(createError.BadRequest(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`));
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { name, phoneNumber, address } = req.body;

  if (!name && !phoneNumber && !address) {
    return next(createError.BadRequest("Provide at least one field to update: name, phoneNumber, address."));
  }

  if (name && name.trim().length < 2) {
    return next(createError.BadRequest("Name must be at least 2 characters."));
  }

  if (phoneNumber && !validator.isMobilePhone(phoneNumber, "en-IN")) {
    return next(createError.BadRequest("Please provide a valid 10-digit phone number."));
  }

  if (address && address.trim().length < 5) {
    return next(createError.BadRequest("Address must be at least 5 characters."));
  }

  next();
};

export { validateRegister, validateLogin, validateUpdateUser }; 