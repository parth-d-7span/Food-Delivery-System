const Menu = require("./menu.model");

class MenuDAO {
  
  async getAllMenuItems() {
  return await Menu.find();
};


  async create(menuData) {
    return await Menu.create(menuData);
  }

  async findByRestaurant(restaurantId) {
    return await Menu.find({
      restaurantId,
      isAvailable: true,
    });
  }

  async findById(menuId) {
    return await Menu.findById(menuId);
  }

  async update(menuId, updateData) {
    return await Menu.findByIdAndUpdate(
      menuId,
      updateData,
      { new: true }
    );
  }

  async delete(menuId) {
    return await Menu.findByIdAndDelete(menuId);
  }

}

module.exports = new MenuDAO();