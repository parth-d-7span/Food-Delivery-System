import Joi from "joi";

export const addMenuValidation = Joi.object({
  restaurantId: Joi.string().hex().length(24).required().messages({
    "string.empty": "Restaurant ID is required",
    "any.required": "Restaurant ID is required",
    "string.length": "Invalid restaurant ID",
  }),

  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Menu name is required",
    "any.required": "Menu name is required",
  }),

  description: Joi.string().allow(null, ""),

  price: Joi.number().min(20).required().messages({
    "number.base": "Price must be number",
    "any.required": "Price is required",
    "number.min": "Minimum price is 20",
  }),

  category: Joi.string()
    .valid("starter", "main_course", "dessert", "beverage", "snack", "combo")
    .required()
    .messages({
      "any.only": "Invalid category",
      "any.required": "Category is required",
    }),

  isAvailable: Joi.boolean(),

  image: Joi.string().uri().allow(null, ""),
});

export const updateMenuValidation = Joi.object({
  name: Joi.string().min(2).max(100),

  description: Joi.string().allow(null, ""),

  price: Joi.number().min(20),

  category: Joi.string().valid("starter", "main_course", "dessert", "beverage", "snack", "combo"),

  image: Joi.string().uri().allow(null, ""),

  isAvailable: Joi.boolean(),
});