import ApiResponse from "../../utils/ApiResponse.js";

import menuService from "./menu.service.js";


// Get all menu items
const getAllMenuItems = async (req, res, next) => {
  try {

    const menuItems = await menuService.getAllMenuItems();

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });

  } catch (error) {
    next(error);
  }
};


// Get menu by restaurant
const getMenuByRestaurant = async (req, res, next) => {
  try {

    const { restaurantId } = req.params;

    const menu = await menuService.getMenuByRestaurant(
      restaurantId
    );

    res.json(
      new ApiResponse(200, "Menu fetched", menu)
    );

  } catch (error) {
    next(error);
  }
};


// ADD menu item
const addMenu = async (req, res, next) => {
  try {

    const restaurantId = req.user._id;

    const imageUrl = req.file ? req.file.path : null;

    const menu = await menuService.addMenuItem(
      {
        ...req.body,
        image: imageUrl
      },
      restaurantId
    );

    res.status(201).json(
      new ApiResponse(201, "Menu created", menu)
    );

  } catch (error) {
    next(error);
  }
};


// Update menu item
const updateMenu = async (req, res, next) => {
  try {

    const userId = req.user._id;

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await menuService.updateMenu(
      req.params.menuId,
      userId,
      updateData
    );

    res.json(
      new ApiResponse(200, "Menu updated", updated)
    );

  } catch (error) {
    next(error);
  }
};


// Delete menu item
const deleteMenu = async (req, res, next) => {
  try {

    const restaurantId = req.user._id;

    await menuService.deleteMenu(
      req.params.menuId,
      restaurantId
    );

    res.json(
      new ApiResponse(200, "Menu deleted")
    );

  } catch (error) {
    next(error);
  }
};


export default {
  getAllMenuItems,
  getMenuByRestaurant,
  addMenu,
  updateMenu,
  deleteMenu
};