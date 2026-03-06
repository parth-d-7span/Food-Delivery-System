import httpStatus from "http-status";

import {
  addRestaurant as addRestaurantService,
  allRestaurants as allRestaurantsService,
  restaurantById as restaurantByIdService,
  modifyRestaurant as modifyRestaurantService,
  removeRestaurant as removeRestaurantService,
} from "./restaurant.services.js";

const addRestaurant = async (req, res, next) => {
  try {
    const restaurant = await addRestaurantService(req.body, req.user._id);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Restaurant created successfully.",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await allRestaurantsService();
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Restaurants fetched successfully.",
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantByIdService(req.params.id);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Restaurant fetched successfully.",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await modifyRestaurantService(req.params.id, req.body, req.user._id);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Restaurant updated successfully.",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const result = await removeRestaurantService(req.params.id, req.user._id);
    return res.status(httpStatus.OK).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
