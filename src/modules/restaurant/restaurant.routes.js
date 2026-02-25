import express from "express";
import restaurantController from "./restaurant.controller.js";
import { verifyAdminToken } from "../../middlewares/verifyadmin.middleware.js";
const router = express.Router(); 

router.post("/",verifyAdminToken, restaurantController.addRestaurant);

router.get("/", restaurantController.getAllRestaurants);

router.get("/:id", restaurantController.getRestaurantById);

router.put("/:id",verifyAdminToken, restaurantController.updateRestaurant);

router.delete("/:id",verifyAdminToken, restaurantController.deleteRestaurant);

export default router;