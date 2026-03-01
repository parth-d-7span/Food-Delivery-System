import { z } from "zod";

const menuItemIdSchema = z
  .string({ requiredError: "Menu item ID is required." })
  .min(1, "Menu item ID is required.");

const addQuantitySchema = z
  .number({ requiredError: "Quantity is required." })
  .int("Quantity must be an integer.")
  .min(1, "Quantity must be at least 1.");

const updateQuantitySchema = z
  .number({ requiredError: "Quantity is required." })
  .int("Quantity must be an integer.")
  .min(0, "Quantity must be greater than or equal to 0.");

export const addToCartSchema = z.object({
  menuItemId: menuItemIdSchema,
  quantity: addQuantitySchema,
});

export const updateCartItemQuantitySchema = z.object({
  menuItemId: menuItemIdSchema,
  quantity: updateQuantitySchema,
});
