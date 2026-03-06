import Joi from "joi";

const restaurantNameSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.empty": "Restaurant name is required.",
    "string.min": "Restaurant name must be at least 2 characters.",
    "string.max": "Restaurant name must not exceed 100 characters.",
    "any.required": "Restaurant name is required.",
  });

const restaurantDescriptionSchema = Joi.string()
  .trim()
  .max(500)
  .allow(null, "")
  .messages({
    "string.max": "Description must not exceed 500 characters.",
  });

const restaurantAddressSchema = Joi.string()
  .trim()
  .min(5)
  .max(200)
  .required()
  .messages({
    "string.empty": "Address is required.",
    "string.min": "Address must be at least 5 characters.",
    "string.max": "Address must not exceed 200 characters.",
    "any.required": "Address is required.",
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

export const addRestaurantSchema = Joi.object({
  name: restaurantNameSchema,
  description: restaurantDescriptionSchema,
  address: restaurantAddressSchema,
  phoneNumber: phoneSchema,
});

export const updateRestaurantSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).messages({
    "string.min": "Restaurant name must be at least 2 characters.",
    "string.max": "Restaurant name must not exceed 100 characters.",
  }),
  description: restaurantDescriptionSchema,
  address: Joi.string().trim().min(5).max(200).messages({
    "string.min": "Address must be at least 5 characters.",
    "string.max": "Address must not exceed 200 characters.",
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base": "Please provide a valid 10-digit phone number.",
    }),
  isActive: Joi.boolean().messages({
    "boolean.base": "Active status must be a boolean.",
  }),
})
  .min(1)
  .messages({
    "object.min":
      "Provide at least one field to update: name, description, address, phoneNumber, isActive.",
  });
