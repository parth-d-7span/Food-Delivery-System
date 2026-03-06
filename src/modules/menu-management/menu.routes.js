import { Router } from "express";

import ROLES from "../../constants/roles.js";
import validate from "../../middlewares/validate.middleware.js";
import upload from "../../middlewares/upload.middleware.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import { addMenuValidation, updateMenuValidation } from "./menu.validation.js";
import {getAllMenuItems, getMenuByRestaurant, addMenu, updateMenu, deleteMenu } from "./menu.controller.js";

const router = Router();

router.get("/", getAllMenuItems);
router.get("/restaurant/:restaurantId", getMenuByRestaurant);
router.post("/", authenticate, authorize(ROLES.ADMIN), upload.single("image"), validate(addMenuValidation), addMenu);
router.put("/:menuId", authenticate, authorize(ROLES.ADMIN), upload.single("image"), validate(updateMenuValidation), updateMenu);
router.delete("/:menuId", authenticate, authorize(ROLES.ADMIN), deleteMenu);

export default router;