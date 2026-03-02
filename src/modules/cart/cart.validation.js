import Joi from "joi";

const menuItemIdSchema = Joi.string().required().min(1).messages({
  "string.empty": "Menu item ID is required.",
  "any.required": "Menu item ID is required.",
});

const addQuantitySchema = Joi.number().integer().min(1).required().messages({
  "number.base": "Quantity must be a number.",
  "number.integer": "Quantity must be an integer.",
  "number.min": "Quantity must be at least 1.",
  "any.required": "Quantity is required.",
});

const updateQuantitySchema = Joi.number().integer().min(0).required().messages({
  "number.base": "Quantity must be a number.",
  "number.integer": "Quantity must be an integer.",
  "number.min": "Quantity must be greater than or equal to 0.",
  "any.required": "Quantity is required.",
});

export const addToCartSchema = Joi.object({
  menuItemId: menuItemIdSchema,
  quantity: addQuantitySchema,
});

export const updateCartItemQuantitySchema = Joi.object({
  menuItemId: menuItemIdSchema,
  quantity: updateQuantitySchema,
});
