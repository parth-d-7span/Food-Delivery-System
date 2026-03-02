import mongoose from "mongoose";

import { NotFound, Forbidden } from "../../utils/errors.js";
import cloudinary from "../../config/cloudinary.js";
import logger from "../../config/logger.js";

import menuDAO from "./menu.dao.js";

const getAllMenuItems = async () => {
  return menuDAO.getAllMenuItems();
};

const addMenuItem = async (data, restaurantId) => {
  return menuDAO.create({
    ...data,
    restaurantId,
  });
};

const getMenuByRestaurant = async (restaurantId) => {
  return menuDAO.findByRestaurant(restaurantId);
};

const updateMenu = async (menuId, userId, updateData) => {
  const menu = await menuDAO.findById(menuId);
  if (!menu) throw NotFound("Menu not found.");

  const restaurantDoc = await mongoose.connection.db
    .collection("restaurants")
    .findOne({ _id: new mongoose.Types.ObjectId(menu.restaurantId) });

  if (restaurantDoc) {
    const resCreatedBy = restaurantDoc.createdBy;
    if (!resCreatedBy || resCreatedBy.toString() !== userId) {
      throw Forbidden("Not allowed.");
    }
  } else {
    logger.warn(
      `Restaurant document for menu ${menuId} not found; skipping ownership check.`,
    );
  }

  if (updateData.image && menu.image) {
    const publicId = menu.image
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId);
  }

  return menuDAO.update(menuId, updateData);
};

const deleteMenu = async (menuId, restaurantId) => {
  const menu = await menuDAO.findById(menuId);
  if (!menu) throw NotFound("Menu not found.");

  const restaurantDoc = await mongoose.connection.db
    .collection("restaurants")
    .findOne({ _id: new mongoose.Types.ObjectId(menu.restaurantId) });

  if (restaurantDoc) {
    const resCreatedBy = restaurantDoc.createdBy;
    if (!resCreatedBy || resCreatedBy.toString() !== restaurantId) {
      throw Forbidden("Not allowed.");
    }
  } else {
    logger.warn(
      `Restaurant document for menu ${menuId} not found; skipping ownership check on delete.`,
    );
  }

  await menuDAO.delete(menuId);
};

export default {
  getAllMenuItems,
  addMenuItem,
  getMenuByRestaurant,
  updateMenu,
  deleteMenu,
};