import express from "express";

const router = express.Router();
import  ROLES  from "../../constants/roles.js";
import validate from "../../middlewares/validate.middleware.js";
import upload from "../../middlewares/upload.middleware.js";
import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";

import { addMenuValidation, updateMenuValidation } from "./menu.validation.js";
import menuController from "./menu.controller.js";




//show all items
router.get("/", menuController.getAllMenuItems);

// show menu by restaurant
router.get("/restaurant/:restaurantId", menuController.getMenuByRestaurant);

//  Add menu item - restaurant only
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  upload.single("image"),  
  validate(addMenuValidation),
  menuController.addMenu
);

// update menu item - restaurant only
router.put(
  "/:menuId",
  authenticate,
  authorize(ROLES.ADMIN),
  upload.single("image"),
  validate(updateMenuValidation),
  menuController.updateMenu 
);

// Delete menu item - restaurant only
router.delete(
  "/:menuId",
  authenticate,
  authorize(ROLES.ADMIN),
  menuController.deleteMenu
);

export default router;