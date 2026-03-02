import mongoose from "mongoose";

import { BadRequest, NotFound } from "../../utils/errors.js";

import restaurantDAO from "./restaurant.dao.js";

const assertValidObjectId = (id, label = "ID") => {
  if (!mongoose.isValidObjectId(id)) {
    throw BadRequest(`Invalid ${label}.`);
  }
};

const addRestaurant = async (body, userId) => {
  const restaurant = await restaurantDAO.createRestaurant({
    ...body,
    isActive: true,
    createdBy: userId,
    updatedBy: userId,
  });

  return restaurant;
};

const fetchAllRestaurants = async () => {
  return restaurantDAO.getAllRestaurants();
};

const fetchRestaurantById = async (id) => {
  assertValidObjectId(id, "restaurant ID");

  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) throw NotFound("Restaurant not found.");

  return restaurant;
};

const modifyRestaurant = async (id, body, userId) => {
  assertValidObjectId(id, "restaurant ID");

  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) throw NotFound("Restaurant not found.");

  return restaurantDAO.updateRestaurantById(id, {
    ...body,
    updatedBy: userId,
  });
};

const removeRestaurant = async (id, userId) => {
  assertValidObjectId(id, "restaurant ID");

  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) throw NotFound("Restaurant not found.");

  await restaurantDAO.softDeleteRestaurantById(id, userId);
  return { message: "Restaurant deleted successfully." };
};

export default {
  addRestaurant,
  fetchAllRestaurants,
  fetchRestaurantById,
  modifyRestaurant,
  removeRestaurant,
};
