import restaurantDAO from "./restaurant.dao.js";
import httpStatus from "http-status";

//Add a new restaurant

export const addRestaurant = async (body, userId) => {
  const { name, description, address, phoneNumber } = body;

  const restaurant = await restaurantDAO.createRestaurant({
    name,
    description,
    address,
    phoneNumber,
    isActive: true,
    createdBy: userId,
    updatedBy: userId,
  });

  return restaurant;
};

//Fetch all restaurants

export const fetchAllRestaurants = async () => {
  const restaurants = await restaurantDAO.getAllRestaurants();
  return restaurants;
};

//  Fetch a single restaurant by ID

export const fetchRestaurantById = async (id) => {
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }
  return restaurant;
};

// Update restaurant details

export const modifyRestaurant = async (id, body, userId) => {
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const { name, description, address, phoneNumber, isActive } = body;

  const updated = await restaurantDAO.updateRestaurantById(id, {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(address !== undefined && { address }),
    ...(phoneNumber !== undefined && { phoneNumber }),
    ...(isActive !== undefined && { isActive }),
    updatedBy: userId,
  });

  return updated;
};

// Soft delete a restaurant

export const removeRestaurant = async (id, userId) => {
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  await restaurantDAO.softDeleteRestaurantById(id, userId);
  return { message: "Restaurant deleted successfully" };
};
