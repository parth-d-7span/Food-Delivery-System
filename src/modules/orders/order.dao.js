import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

const createOrder = async (orderData) => Order.create(orderData);

const findOrderById = async (id) =>
  Order.findById(id).populate("userId", "name email").populate("restaurantId", "name address");

const findOrdersByUser = async (userId) =>
  Order.find({ userId }).populate("restaurantId", "name address").sort({ createdAt: -1 });

const findAllOrders = async () =>
  Order.find()
    .populate("userId", "name email")
    .populate("restaurantId", "name address")
    .sort({ createdAt: -1 });

const updateOrderStatus = async (id, status) =>
  Order.findByIdAndUpdate(id, { status }, { returnDocument: "after" });

const createOrderItems = async (orderItems) => OrderItem.insertMany(orderItems);

const findOrderItemsByOrderId = async (orderId) => OrderItem.find({ orderId });

export {
  createOrder,
  findOrderById,
  findOrdersByUser,
  findAllOrders,
  updateOrderStatus,
  createOrderItems,
  findOrderItemsByOrderId,
};
