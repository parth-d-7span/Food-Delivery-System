import Joi from "joi";

const nameSchema = Joi.string().trim().min(2).required().messages({
  "string.empty": "Name is required.",
  "string.min": "Name must be at least 2 characters.",
  "any.required": "Name is required.",
});

const emailSchema = Joi.string().trim().email().required().messages({
  "string.empty": "Email is required.",
  "string.email": "Please provide a valid email address.",
  "any.required": "Email is required.",
});

const passwordSchema = Joi.string().min(8).required().messages({
  "string.empty": "Password is required.",
  "string.min": "Password must be at least 8 characters.",
  "any.required": "Password is required.",
});

const phoneSchema = Joi.string()
  .trim()
  .pattern(/^[6-9]\d{9}$/)
  .required()
  .messages({
    "string.empty": "Phone number is required.",
    "string.pattern.base": "Please provide a valid 10-digit phone number.",
    "any.required": "Phone number is required.",
  });

const addressSchema = Joi.string().trim().min(5).required().messages({
  "string.empty": "Address is required.",
  "string.min": "Address must be at least 5 characters.",
  "any.required": "Address is required.",
});

const roleSchema = Joi.string().valid("customer", "admin").default("customer").messages({
  "any.only": "Role must be either customer or admin.",
});

export const registerSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phoneNumber: phoneSchema,
  address: addressSchema,
  role: roleSchema,
});

export const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).messages({
    "string.min": "Name must be at least 2 characters.",
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base": "Please provide a valid 10-digit phone number.",
    }),
  address: Joi.string().trim().min(5).messages({
    "string.min": "Address must be at least 5 characters.",
  }),
})
  .min(1)
  .messages({
    "object.min": "Provide at least one field to update: name, phoneNumber, address.",
  });
