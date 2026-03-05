import { Router } from "express";

import authorize from "../../middlewares/authorize.middleware.js";
import ROLES from "../../constants/roles.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { addRestaurantSchema, updateRestaurantSchema } from "./restaurant.validation.js";
import * as restaurantController from "./restaurant.controller.js";

const router = Router();

router.post("/", authenticate, authorize(ROLES.ADMIN), validate(addRestaurantSchema), restaurantController.addRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.put("/:id", authenticate, authorize(ROLES.ADMIN), validate(updateRestaurantSchema), restaurantController.updateRestaurant);
router.delete("/:id", authenticate, authorize(ROLES.ADMIN), restaurantController.deleteRestaurant);

export default router;
