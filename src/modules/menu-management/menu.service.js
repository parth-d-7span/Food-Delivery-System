const menuDAO = require("./menu.dao");
const ApiError = require("../../utils/ApiError");
const cloudinary = require("../../config/cloudinary");

class MenuService {

  async getAllMenuItems() {

  const menuItems = await menuDAO.getAllMenuItems();

  return menuItems;
};

  // Restaurant adds menu item
  async addMenuItem(data, restaurantId) {

    const menu = await menuDAO.create({
      ...data,
      restaurantId,
    });

    return menu;
  }

  // User gets menu by restaurant
  async getMenuByRestaurant(restaurantId) {

    const menu = await menuDAO.findByRestaurant(restaurantId);

    return menu;
  }

  // Restaurant updates menu item
  async updateMenu(menuId, restaurantId, updateData) {

    const menu = await menuDAO.findById(menuId);

    if (!menu)
      throw new ApiError(404, "Menu not found");

    if (menu.restaurantId.toString() !== restaurantId)
      throw new ApiError(403, "Not allowed");


    // DELETE OLD IMAGE
  if (updateData.image && menu.image) {

    const publicId = menu.image
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId);

  }

    return await menuDAO.update(menuId, updateData);
  }

  // Restaurant deletes menu item
  async deleteMenu(menuId, restaurantId) {

    const menu = await menuDAO.findById(menuId);

    if (!menu)
      throw new ApiError(404, "Menu not found");

    if (menu.restaurantId.toString() !== restaurantId)
      throw new ApiError(403, "Not allowed");

    await menuDAO.delete(menuId);

    return;
  }

}

module.exports = new MenuService();