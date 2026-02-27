import e from "express";
import Joi from "joi";

export const addMenuValidation = Joi.object({

  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Menu name is required",
      "any.required": "Menu name is required"
    }),

  description: Joi.string()
    .allow(null, ""),

  price: Joi.number()
    .min(20)
    .required()
    .messages({
      "number.base": "Price must be number",
      "any.required": "Price is required",
      "number.min": "Minimum price is 20"
    }),

  category: Joi.string()
    .valid(
      "starter",
      "main_course",
      "dessert",
      "beverage",
      "snack",
      "combo"
    )
    .required()
    .messages({
      "any.only": "Invalid category",
      "any.required": "Category is required"
    }),

  image: Joi.string()
    .uri()
    .allow(null, "")
});



export const updateMenuValidation = Joi.object({

  name: Joi.string().min(2).max(100),

  description: Joi.string().allow(null, ""),

  price: Joi.number().min(20),

  category: Joi.string().valid(
    "starter",
    "main_course",
    "dessert",
    "beverage",
    "snack",
    "combo"
  ),

  image: Joi.string().uri().allow(null, ""),

  isAvailable: Joi.boolean()

});

