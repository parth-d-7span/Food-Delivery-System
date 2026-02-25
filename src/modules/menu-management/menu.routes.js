const express = require("express");
const router = express.Router();
const menuController = require("./menu.controller");
const mockAuth = require("../../middlewares/mockAuth.middleware");
const validate = require("../../middlewares/validate.middleware");
const role = require("../../middlewares/role.middleware");
const {addMenuValidation, updateMenuValidation} = require("./menu.validation");
const upload = require("../../middlewares/upload.middleware");


//show all items
router.get("/", menuController.getAllMenuItems);

// show menu by restaurant
router.get("/restaurant/:restaurantId", menuController.getMenuByRestaurant);

//  Add menu item - restaurant only
router.post(
  "/",
  mockAuth,
  role("restaurant"),
  upload.single("image"),  
  validate(addMenuValidation),
  menuController.addMenu
);

// update menu item - restaurant only
router.put(
  "/:menuId",
  mockAuth,
  role("restaurant"),
  upload.single("image"),
  validate(updateMenuValidation),
  menuController.updateMenu
);

// Delete menu item - restaurant only
router.delete(
  "/:menuId",
  mockAuth,
  role("restaurant"),
  menuController.deleteMenu
);

module.exports = router;