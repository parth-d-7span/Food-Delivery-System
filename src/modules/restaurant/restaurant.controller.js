import httpStatus from "http-status";

import restaurantService from "./restaurant.services.js";

// POST Add a new restaurant
 
export const addRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.addRestaurant(req.body, req.user._id);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


 // GET Get all restaurants
 
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.fetchAllRestaurants();
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


 // GET Get a single restaurant by ID
 
export const getRestaurantById = async (req, res) => {
  try {
    const id = req.params.id ;
    const restaurant = await restaurantService.fetchRestaurantById(id);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


 // PUT Update a restaurant

export const updateRestaurant = async (req, res) => {
  try {

    const id = req.params.id;
    const body = req.body;
    const userId = req.user._id;
    const restaurant = await restaurantService.modifyRestaurant(
      id,
      body,
      userId
    );
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Restaurant updated successfully",
      data: restaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


 // DELETE Soft delete a restaurant
 
export const deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const userId= req.user._id;
    const result = await restaurantService.removeRestaurant(id,userId);
    return res.status(httpStatus.OK).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

