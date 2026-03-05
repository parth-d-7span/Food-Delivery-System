import httpStatus from "http-status";

import menuService from "./menu.service.js";

const getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
    return res.status(httpStatus.OK).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

const getMenuByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const menu = await menuService.getMenuByRestaurant(restaurantId);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Menu fetched successfully.",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

const addMenu = async (req, res, next) => {
  try {
    const restaurantId = req.user._id;
    const imageUrl = req.file ? req.file.path : null;

    const menu = await menuService.addMenuItem({ ...req.body, image: imageUrl }, restaurantId);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Menu created successfully.",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await menuService.updateMenu(req.params.menuId, userId, updateData);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Menu updated successfully.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const restaurantId = req.user._id;
    await menuService.deleteMenu(req.params.menuId, restaurantId);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Menu deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export { getAllMenuItems, getMenuByRestaurant, addMenu, updateMenu, deleteMenu };
