import mongoose from "mongoose";

import ApiError from "../../utils/ApiError.js";
import cloudinary from "../../config/cloudinary.js";

import menuDAO from "./menu.dao.js";
import menuItem from "./menu.model.js";




// Get all menu items
const getAllMenuItems = async () => {

  const menuItems = await menuDAO.getAllMenuItems();

  return menuItems;
};


// Restaurant adds menu item
const addMenuItem = async (data, restaurantId) => {

  const menu = await menuDAO.create({
    ...data,
    restaurantId,
  });

  return menu;
};


// User gets menu by restaurant
const getMenuByRestaurant = async (restaurantId) => {

  const menu = await menuDAO.findByRestaurant(restaurantId);

  return menu;
};


// Restaurant updates menu item
const updateMenu = async (menuId, userId, updateData) => {

  const menu = await menuItem.findById(menuId);

  if (!menu)
    throw new ApiError(404, "Menu not found");

  // const menuFromDAO = await menuItem.findById(menuId).populate("restaurantId", "createdBy");

  // if (!menuFromDAO || !menuFromDAO.restaurantId)
  //   throw new ApiError(404, "Menu or restaurant not found");

  // const resCreatedBy = menuFromDAO.restaurantId.createdBy;
  // if (!resCreatedBy || resCreatedBy.toString() !== userId)
  //   throw new ApiError(403, "Not allowed");

  const restaurantDoc = await mongoose.connection.db
    .collection("restaurants")
    .findOne({ _id: new mongoose.Types.ObjectId(menu.restaurantId) });

  // if the restaurant record has been removed, we no longer can verify ownership.
  // instead of failing with 404 we allow the update to proceed but log a warning.
  if (restaurantDoc) {
    const resCreatedBy = restaurantDoc.createdBy; 
    if (!resCreatedBy || resCreatedBy.toString() !== userId)
      throw new ApiError(403, "Not allowed");
  } else {
    console.warn(
      `Restaurant document for menu ${menuId} not found; skipping ownership check.`
    );
  }


  // DELETE OLD IMAGE FROM CLOUDINARY
  if (updateData.image && menu.image) {

    const publicId = menu.image
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId);
  }


  return await menuDAO.update(menuId, updateData);
};


// Restaurant deletes menu item
const deleteMenu = async (menuId, restaurantId) => {

  const menu = await menuDAO.findById(menuId);

  if (!menu)
    throw new ApiError(404, "Menu not found");

  // look up restaurant directly (bypass soft-delete hooks)
  const restaurantDoc = await mongoose.connection.db
    .collection("restaurants")
    .findOne({ _id: new mongoose.Types.ObjectId(menu.restaurantId) });

  if (restaurantDoc) {
    // owner must match
    const resCreatedBy = restaurantDoc.createdBy;
    if (!resCreatedBy || resCreatedBy.toString() !== restaurantId)
      throw new ApiError(403, "Not allowed");
  } else {
    console.warn(
      `Restaurant document for menu ${menuId} not found; skipping ownership check on delete.`
    );
  }

  await menuDAO.delete(menuId);

  return;
};


export default {
  getAllMenuItems,
  addMenuItem,
  getMenuByRestaurant,
  updateMenu,
  deleteMenu
};