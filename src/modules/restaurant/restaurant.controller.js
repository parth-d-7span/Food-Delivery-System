import restaurantService from "./restaurant.services.js";

export const addRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.addRestaurant(req.body, req.user._id);
    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully.",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.fetchAllRestaurants();
    return res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully.",
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.fetchRestaurantById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Restaurant fetched successfully.",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.modifyRestaurant(
      req.params.id,
      req.body,
      req.user._id,
    );
    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully.",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (req, res, next) => {
  try {
    const result = await restaurantService.removeRestaurant(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
