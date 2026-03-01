import createError from "http-errors";
import mongoose from "mongoose";

import ROLES from "../../constants/roles.js";
import logger from "../../config/logger.js";
import Cart from "../carts/cart.model.js";

import {
  createOrder,
  findOrderById,
  findOrdersByUser,
  findAllOrders,
  updateOrderStatus,
  createOrderItems,
  findOrderItemsByOrderId,
} from "./order.dao.js";
import { ORDER_STATUS } from "./order.model.js";

const placeOrder = async ({ userId, deliveryAddress }) => {
  const cartItems = await Cart.find({ userId }).populate("menuItemId");

  if (!cartItems || cartItems.length === 0) {
    throw createError.BadRequest("Your cart is empty. Add items before placing an order.");
  }

  const unavailableItems = cartItems.filter(
    (cartItem) => !cartItem.menuItemId || !cartItem.menuItemId.isAvailable
  );

  if (unavailableItems.length > 0) {
    throw createError.BadRequest(
      "Some items in your cart are no longer available. Please update your cart."
    );
  }

  const restaurantId = cartItems[0].menuItemId.restaurantId;

  const totalAmount = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.menuItemId.price * cartItem.quantity,
    0
  );

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

    const orderItems = cartItems.map((cartItem) => ({
      orderId: order._id,
      menuItemId: cartItem.menuItemId._id,
      name: cartItem.menuItemId.name,
      category: cartItem.menuItemId.category,
      image: cartItem.menuItemId.image || null,
      priceAtOrder: cartItem.menuItemId.price,
      quantity: cartItem.quantity,
    }));

    await createOrderItems(orderItems);

    await Cart.deleteMany({ userId });

    await session.commitTransaction();

    logger.info(`Order placed: ${order._id} | User: ${userId} | Total: ₹${totalAmount}`);

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
  if (!order) throw createError.NotFound("Order not found.");

  if (
    requestedBy.role !== ROLES.ADMIN &&
    order.userId._id.toString() !== requestedBy._id.toString()
  ) {
    throw createError.Forbidden("You are not allowed to view this order.");
  }

  const orderItems = await findOrderItemsByOrderId(orderId);

  return { order, orderItems };
};

const getMyOrders = async (userId) => findOrdersByUser(userId);

const getAllOrders = async () => findAllOrders();

const cancelOrder = async (orderId, requestedBy) => {
  const order = await findOrderById(orderId);
  if (!order) throw createError.NotFound("Order not found.");

  if (order.userId._id.toString() !== requestedBy._id.toString()) {
    throw createError.Forbidden("You are not allowed to cancel this order.");
  }

  if (order.status !== ORDER_STATUS.PENDING) {
    throw createError.BadRequest(`Order cannot be cancelled. Current status is '${order.status}'.`);
  }

  await updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
  logger.info(`Order cancelled: ${orderId} | User: ${requestedBy._id}`);
};

const updateStatus = async (orderId, newStatus) => {
  const order = await findOrderById(orderId);
  if (!order) throw createError.NotFound("Order not found.");

  const validTransitions = {
    [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.DELIVERED],
    [ORDER_STATUS.DELIVERED]: [],
    [ORDER_STATUS.CANCELLED]: [],
  };

  const allowed = validTransitions[order.status];

  if (!allowed.includes(newStatus)) {
    throw createError.BadRequest(`Cannot change status from '${order.status}' to '${newStatus}'.`);
  }

  await updateOrderStatus(orderId, newStatus);
  logger.info(`Order status updated: ${orderId} | '${order.status}' → '${newStatus}'`);
};

export { placeOrder, getOrder, getMyOrders, getAllOrders, cancelOrder, updateStatus };
