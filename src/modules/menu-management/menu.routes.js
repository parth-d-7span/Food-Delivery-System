import { Router } from "express";

import ROLES from "../../constants/roles.js";
import validate from "../../middlewares/validate.middleware.js";
import upload from "../../middlewares/upload.middleware.js";
import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";

import { addMenuValidation, updateMenuValidation } from "./menu.validation.js";
import menuController from "./menu.controller.js";

const router = Router();

router.get("/", menuController.getAllMenuItems);
router.get("/restaurant/:restaurantId", menuController.getMenuByRestaurant);
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  upload.single("image"),
  validate(addMenuValidation),
  menuController.addMenu,
);
router.put(
  "/:menuId",
  authenticate,
  authorize(ROLES.ADMIN),
  upload.single("image"),
  validate(updateMenuValidation),
  menuController.updateMenu,
);
router.delete(
  "/:menuId",
  authenticate,
  authorize(ROLES.ADMIN),
  menuController.deleteMenu,
);

export default router;