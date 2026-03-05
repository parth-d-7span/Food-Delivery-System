import { Router } from "express";

import authenticate from "../../middlewares/authenticate.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { addToCartSchema, updateCartItemQuantitySchema } from "./cart.validation.js";
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  getCart,
  clearUserCart,
} from "./cart.controller.js";

const router = Router();

router.get("/", authenticate, getCart);
router.post("/items", authenticate, validate(addToCartSchema), addItemToCart);
router.patch("/items", authenticate, validate(updateCartItemQuantitySchema), updateItemQuantity);
router.delete("/items/:menuItemId", authenticate, removeItemFromCart);
router.delete("/", authenticate, clearUserCart);

export default router;
