import mongoose from "mongoose";

import { BadRequest, NotFound } from "../../utils/errors.js";

import { createRestaurant, updateRestaurantById, DeleteRestaurantById, getRestaurantById, getAllRestaurants } from "./restaurant.dao.js";

const assertValidObjectId = (id, label = "ID") => {
  if (!mongoose.isValidObjectId(id)) {
    throw BadRequest(`Invalid ${label}.`);
  }
};

const addRestaurant = async (body, userId) => {
  const restaurant = await createRestaurant({
    ...body,
    isActive: true,
    createdBy: userId,
    updatedBy: userId,
  });

  return restaurant;
};

const allRestaurants = async () => {
  const restaurant = await getAllRestaurants();
  return restaurant;
};


const restaurantById = async (id) => {
  assertValidObjectId(id, "restaurant ID");

  const restaurant = await getRestaurantById(id);
  if (!restaurant) throw NotFound("Restaurant not found.");

  return restaurant;
};

const modifyRestaurant = async (id, body, userId) => {
  assertValidObjectId(id, "restaurant ID");

  const restaurant = await getRestaurantById(id);
  if (!restaurant) throw NotFound("Restaurant not found.");

  return updateRestaurantById(id, {
    ...body,
    updatedBy: userId,
  });
};

const removeRestaurant = async (id, userId) => {
  assertValidObjectId(id, "restaurant ID");

  const restaurant = await getRestaurantById(id);
  if (!restaurant) throw NotFound("Restaurant not found.");

  await DeleteRestaurantById(id, userId);
  return { message: "Restaurant deleted successfully." };
};

export { addRestaurant, allRestaurants, restaurantById, modifyRestaurant, removeRestaurant };
