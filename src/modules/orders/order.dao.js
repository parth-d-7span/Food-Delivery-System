import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

const createOrder = async (orderData) => Order.create(orderData);

const findOrderById = async (id) =>
  Order.findById(id)
    .populate({ path: "userId", select: "name email" })
    .populate({ path: "restaurantId", select: "name address phoneNumber", match: { deletedAt: null } });

const findOrdersByUser = async (userId) =>
  Order.find({ userId })
    .populate({ path: "restaurantId", select: "name address phoneNumber", match: { deletedAt: null } })
    .sort({ createdAt: -1 });

const findAllOrders = async () =>
  Order.find()
    .populate({ path: "userId", select: "name email" })
    .populate({ path: "restaurantId", select: "name address phoneNumber", match: { deletedAt: null } })
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