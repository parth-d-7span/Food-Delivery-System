import Restaurant from "./restaurant.model.js";


 // Create a new restaurant
 
const createRestaurant = async (data) => {
  return await Restaurant.create(data);
};


 // Get all active (non-deleted) restaurants
 
const getAllRestaurants = async () => {
  return await Restaurant.find();
};


 // Get a single restaurant by ID
 
const getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};


 // Update a restaurant by ID
 
const updateRestaurantById = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};


 // Soft delete a restaurant
 
const softDeleteRestaurantById = async (id, userId) => {
  return await Restaurant.findByIdAndUpdate(
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
