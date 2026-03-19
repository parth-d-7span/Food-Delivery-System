import Joi from "joi";

import type { UserPaginationQuery } from "./dto/userQuery.dto.js";
import type { UserUpdateInput } from "./dto/user.dto.js";

export const updateUserSchema = Joi.object<UserUpdateInput>({
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

export const getAllUsersQuerySchema = Joi.object<UserPaginationQuery>({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number.",
    "number.integer": "Page must be an integer.",
    "number.min": "Page must be at least 1.",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number.",
    "number.integer": "Limit must be an integer.",
    "number.min": "Limit must be at least 1.",
    "number.max": "Limit must be at most 100.",
  }),
});
