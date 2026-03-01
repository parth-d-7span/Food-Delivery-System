import express from "express";

import authorize from "../../middlewares/authorize.js";
import ROLES from "../../constants/roles.js";
import authenticate from "../../middlewares/authenticate.js";

import * as restaurantController from "./restaurant.controller.js";
const router = express.Router(); 

router.post("/",authenticate,authorize(ROLES.ADMIN), restaurantController.addRestaurant);

router.get("/", restaurantController.getAllRestaurants);

router.get("/:id", restaurantController.getRestaurantById);

router.put("/:id",authenticate,authorize(ROLES.ADMIN), restaurantController.updateRestaurant);

router.delete("/:id",authenticate,authorize(ROLES.ADMIN), restaurantController.deleteRestaurant);

export default router;

