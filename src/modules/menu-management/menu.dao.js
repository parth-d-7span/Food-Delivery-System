import Menu from "./menu.model.js";


// Get all menu items
const getAllMenuItems = async () => {
  return await Menu.find();
};


// Create menu item
const create = async (menuData) => {
  return await Menu.create(menuData);
};


// Find menu by restaurant
const findByRestaurant = async (restaurantId) => {
  return await Menu.find({
    restaurantId,
    isAvailable: true,
  });
};


// Find menu by ID
const findById = async (menuId) => {
  return await Menu.findById(menuId);
};


// Update menu
const update = async (menuId, updateData) => {
  return await Menu.findByIdAndUpdate(
    menuId,
    updateData,
    { new: true }
  );
};


// Delete menu
const deleteMenu = async (menuId) => {
  return await Menu.findByIdAndDelete(menuId);
};


export default {
  getAllMenuItems,
  create,
  findByRestaurant,
  findById,
  update,
  delete: deleteMenu
};