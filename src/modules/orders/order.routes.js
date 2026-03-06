import { Router } from "express";

import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import ROLES from "../../constants/roles.js";

import { placeOrderSchema, updateOrderStatusSchema } from "./order.validation.js";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrder,
  cancelOrder,
  updateStatus,
} from "./order.controller.js";

const router = Router();

router.post("/", authenticate, authorize(ROLES.CUSTOMER), validate(placeOrderSchema), placeOrder);
router.get("/", authenticate, authorize(ROLES.CUSTOMER), getMyOrders);
router.get("/allOrders", authenticate, authorize(ROLES.ADMIN), getAllOrders);
router.get("/:id", authenticate, getOrder);
router.patch("/:id/cancel", authenticate, authorize(ROLES.CUSTOMER), cancelOrder);
router.patch("/:id/status", authenticate, authorize(ROLES.ADMIN), validate(updateOrderStatusSchema), updateStatus);

export default router;
