import Joi from "joi";

export const placeOrderSchema = Joi.object({
  deliveryAddress: Joi.string().trim().min(5).required().messages({
    "string.empty": "Delivery address is required.",
    "string.min": "Delivery address must be at least 5 characters.",
    "any.required": "Delivery address is required.",
  }),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "confirmed", "delivered", "cancelled").required().messages({
    "any.only": "Status must be one of: pending, confirmed, delivered, cancelled.",
    "any.required": "Status is required.",
  }),
});
