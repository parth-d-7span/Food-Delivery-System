import Menu from "./menu.model.js";

const getAllMenuItems = async () => {
  return Menu.find();
};

const create = async (menuData) => {
  return Menu.create(menuData);
};

const findByRestaurant = async (restaurantId) => {
  return Menu.find({
    restaurantId,
    isAvailable: true,
  });
};

const findById = async (menuId) => {
  return Menu.findById(menuId);
};

const update = async (menuId, updateData) => {
  return Menu.findByIdAndUpdate(menuId, updateData, { new: true });
};

const deleteMenu = async (menuId) => {
  return Menu.findByIdAndDelete(menuId);
};

export default {
  getAllMenuItems,
  create,
  findByRestaurant,
  findById,
  update,
  delete: deleteMenu,
};
