import Menu from "./menu.model.js";


// Get all menu items
const getAllMenuItems = async () => {
  return Menu.find();
};


// Create menu item
const create = async (menuData) => {
  return Menu.create(menuData);
};


// Find menu by restaurant
const findByRestaurant = async (restaurantId) => {
  return Menu.find({
    restaurantId,
    isAvailable: true,
  });
};


// Find menu by ID
const findById = async (menuId) => {
  return Menu.findById(menuId);
};


// Update menu
const update = async (menuId, updateData) => {
  return Menu.findByIdAndUpdate(
    menuId,
    updateData,
    { new: true }
  );
};


// Delete menu
const deleteMenu = async (menuId) => {
  return Menu.findByIdAndDelete(menuId);
};


export default {
  getAllMenuItems,
  create,
  findByRestaurant,
  findById,
  update,
  delete: deleteMenu
};