import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { placeOrderSchema, updateOrderStatusSchema } from "../../config/schemas.js";
import ROLES from "../../constants/roles.js";

import {
  placeOrderHandler,
  getMyOrdersHandler,
  getAllOrdersHandler,
  getOrderHandler,
  cancelOrderHandler,
  updateStatusHandler,
} from "./order.controller.js";

const router = Router();

// POST   /api/v1/orders             — customer places order from their cart
router.post(
  "/",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(placeOrderSchema),
  placeOrderHandler
);

// GET    /api/v1/orders/my          — customer views their own orders
// NOTE: /my must be defined before /:id to avoid Express treating "my" as an id
router.get("/my", authenticate, authorize(ROLES.CUSTOMER), getMyOrdersHandler);

// GET    /api/v1/orders             — admin views all orders
router.get("/", authenticate, authorize(ROLES.ADMIN), getAllOrdersHandler);

// GET    /api/v1/orders/:id         — customer views own order / admin views any
router.get("/:id", authenticate, getOrderHandler);

// PATCH  /api/v1/orders/:id/cancel  — customer cancels their own pending order
router.patch("/:id/cancel", authenticate, authorize(ROLES.CUSTOMER), cancelOrderHandler);

// PATCH  /api/v1/orders/:id/status  — admin updates order status
router.patch(
  "/:id/status",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(updateOrderStatusSchema),
  updateStatusHandler
);

export default router;
