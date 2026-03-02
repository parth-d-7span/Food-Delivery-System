import mongoose from "mongoose";

import { BadRequest, NotFound, Forbidden } from "../../utils/errors.js";
import logger from "../../config/logger.js";
import Cart from "../cart/cart.model.js";
import ROLES from "../../constants/roles.js";

import { ORDER_STATUS } from "./order.model.js";
import {
  createOrder,
  findOrderById,
  findOrdersByUser,
  findAllOrders,
  updateOrderStatus,
  createOrderItems,
  findOrderItemsByOrderId,
} from "./order.dao.js";

const placeOrder = async ({ userId, deliveryAddress }) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw BadRequest("Your cart is empty. Add items before placing an order.");
  }

  const { default: menuDAO } = await import("../menu-management/menu.dao.js");
  const firstMenuItem = await menuDAO.findById(cart.items[0].menuItemId);

  if (!firstMenuItem) {
    throw BadRequest("Some items in your cart are no longer available. Please update your cart.");
  }

  const restaurantId = firstMenuItem.restaurantId;
  const totalAmount = cart.totalAmount;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await createOrder({
      userId,
      restaurantId,
      deliveryAddress,
      totalAmount,
      status: ORDER_STATUS.PENDING,
    });

    const orderItems = cart.items.map((item) => ({
      orderId: order._id,
      menuItemId: item.menuItemId,
      name: item.name,
      category: item.category || "uncategorized",
      image: item.image || null,
      priceAtOrder: item.price,
      quantity: item.quantity,
    }));

    await createOrderItems(orderItems);

    await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalAmount: 0, quantity: 0, menuItemId: null },
    );

    await session.commitTransaction();

    logger.info(
      `Order placed: ${order._id} | User: ${userId} | Total: ₹${totalAmount}`,
    );

    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getOrder = async (orderId, requestedBy) => {
  const order = await findOrderById(orderId);
  if (!order) throw NotFound("Order not found.");

  if (
    requestedBy.role !== ROLES.ADMIN &&
    order.userId._id.toString() !== requestedBy._id.toString()
  ) {
    throw Forbidden("You are not allowed to view this order.");
  }

  const orderItems = await findOrderItemsByOrderId(orderId);

  return { order, orderItems };
};

const getMyOrders = async (userId) => findOrdersByUser(userId);
const getAllOrders = async () => findAllOrders();

const cancelOrder = async (orderId, requestedBy) => {
  const order = await findOrderById(orderId);
  if (!order) throw NotFound("Order not found.");

  if (order.userId._id.toString() !== requestedBy._id.toString()) {
    throw Forbidden("You are not allowed to cancel this order.");
  }

  if (order.status !== ORDER_STATUS.PENDING) {
    throw BadRequest(`Order cannot be cancelled. Current status is '${order.status}'.`);
  }

  await updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
  logger.info(`Order cancelled: ${orderId} | User: ${requestedBy._id}`);
};

const updateStatus = async (orderId, newStatus) => {
  const order = await findOrderById(orderId);
  if (!order) throw NotFound("Order not found.");

  const validTransitions = {
    [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.DELIVERED],
    [ORDER_STATUS.DELIVERED]: [],
    [ORDER_STATUS.CANCELLED]: [],
  };

  const allowed = validTransitions[order.status];

  if (!allowed.includes(newStatus)) {
    throw BadRequest(`Cannot change status from '${order.status}' to '${newStatus}'.`);
  }

  await updateOrderStatus(orderId, newStatus);
  logger.info(`Order status updated: ${orderId} | '${order.status}' → '${newStatus}'`);
};

export { placeOrder, getOrder, getMyOrders, getAllOrders, cancelOrder, updateStatus };