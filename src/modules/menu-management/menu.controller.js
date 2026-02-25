const menuService = require("./menu.service");
const ApiResponse = require("../../utils/ApiResponse");

class MenuController {

  // Get all menu items
  async getAllMenuItems(req, res) {

    try {

      const menuItems = await menuService.getAllMenuItems();

      res.status(200).json({
        success: true,
        count: menuItems.length,
        data: menuItems
      });

    } catch (error) {
      next(error);

    };

  };

   // Get menu by restaurant
  async getMenuByRestaurant(req, res, next) {
    try {

      const { restaurantId } = req.params;

      const menu =
        await menuService.getMenuByRestaurant(
          restaurantId
        );

      res.json(
        new ApiResponse(200, "Menu fetched", menu)
      );

    } catch (error) {
      next(error);
    }
  }


  // ADD menu item - restaurant only

  async addMenu(req, res, next) {
    try {

      const restaurantId = req.user._id;

      // console.log(req.file);

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
  }

  // Update menu item - restaurant only
  async updateMenu(req, res, next) {
    try {

      const restaurantId = req.user._id;

      let updateData = { ...req.body };

      if (req.file) {

        updateData.image = req.file.path;

      }

      const updated =
        await menuService.updateMenu(
          req.params.menuId,
          restaurantId,
          updateData

        );

      res.json(
        new ApiResponse(200, "Menu updated", updated)
      );

    } catch (error) {
      next(error);
    }
  }

  // Delete menu item - restaurant only
  async deleteMenu(req, res, next) {
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
  }

}

module.exports = new MenuController();