import Restaurant from "./restaurant.model.js";


 // Create a new restaurant
 
const createRestaurant = async (data) => {
  return Restaurant.create(data);
};


 // Get all active (non-deleted) restaurants
 
const getAllRestaurants = async () => {
  return Restaurant.find();
};


 // Get a single restaurant by ID
 
const getRestaurantById = async (id) => {
  return Restaurant.findById(id);
};


 // Update a restaurant by ID
 
const updateRestaurantById = async (id, data) => {
  return Restaurant.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};


 // Soft delete a restaurant
 
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
