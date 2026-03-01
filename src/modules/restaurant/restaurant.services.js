import httpStatus from "http-status";
import mongoose from "mongoose";

import restaurantDAO from "./restaurant.dao.js";

const assertValidRestaurantId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("Invalid restaurant ID");
    error.statusCode = httpStatus.BAD_REQUEST;
    throw error;
  }
};

//Add a new restaurant

const addRestaurant = async (body, userId) => {
  // body has already been validated by Zod middleware (shape + types)
  const restaurant = await restaurantDAO.createRestaurant({
    ...body,
    isActive: true,
    createdBy: userId,
    updatedBy: userId,
  });

  return restaurant;
};

//Fetch all restaurants

const fetchAllRestaurants = async () => {
  const restaurants = await restaurantDAO.getAllRestaurants();
  return restaurants;
};

//  Fetch a single restaurant by ID

const fetchRestaurantById = async (id) => {
  assertValidRestaurantId(id);
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }
  return restaurant;
};

// Update restaurant details

const modifyRestaurant = async (id, body, userId) => {
  assertValidRestaurantId(id);
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  // body already validated; just spread into update
  const updated = await restaurantDAO.updateRestaurantById(id, {
    ...body,
    updatedBy: userId,
  });

  return updated;
};


// Soft delete a restaurant

const removeRestaurant = async (id, userId) => {
  assertValidRestaurantId(id);
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  await restaurantDAO.softDeleteRestaurantById(id, userId);
  return { message: "Restaurant deleted successfully" };
};

const restaurantService = {
  addRestaurant,
  fetchAllRestaurants,
  fetchRestaurantById,
  modifyRestaurant,
  removeRestaurant,
};

export default restaurantService;
