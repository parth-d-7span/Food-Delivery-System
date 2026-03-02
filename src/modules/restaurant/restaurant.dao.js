import Restaurant from "./restaurant.model.js";

const createRestaurant = async (data) => {
  return Restaurant.create(data);
};

const getAllRestaurants = async () => {
  return Restaurant.find();
};

const getRestaurantById = async (id) => {
  return Restaurant.findById(id);
};

const updateRestaurantById = async (id, data) => {
  return Restaurant.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const softDeleteRestaurantById = async (id, userId) => {
  return Restaurant.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), updatedBy: userId },
    { new: true }
  );
};

const restaurantDAO = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  softDeleteRestaurantById,
};

export default restaurantDAO;
