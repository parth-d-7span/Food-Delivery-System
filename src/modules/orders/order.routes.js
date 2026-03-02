import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.middleware.js";
import { placeOrderSchema, updateOrderStatusSchema } from "./order.validation.js";
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

router.post(
  "/",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(placeOrderSchema),
  placeOrderHandler
);
router.get("/my", authenticate, authorize(ROLES.CUSTOMER), getMyOrdersHandler);
router.get("/", authenticate, authorize(ROLES.ADMIN), getAllOrdersHandler);
router.get("/:id", authenticate, getOrderHandler);
router.patch("/:id/cancel", authenticate, authorize(ROLES.CUSTOMER), cancelOrderHandler);
router.patch(
  "/:id/status",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(updateOrderStatusSchema),
  updateStatusHandler
);

export default router;
