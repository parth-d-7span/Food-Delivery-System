import createError from "http-errors";
import httpStatus from "http-status";
import mongoose from "mongoose";

import {
  findCartByUserId,
  upsertCartByUserId,
  saveCart,
  deleteCartItemsByUserId,
} from "./cart.dao.js";

const validateCartOwnership = (cart, userId) => {
  if (!cart) {
    throw createError.NotFound("Cart not found.");
  }
  if (cart.userId.toString() !== userId) {
    throw createError.Forbidden("You can only access your own cart.");
  }
};

const validateObjectId = (id, fieldName) => {
  if (!mongoose.isValidObjectId(id)) {
    throw createError.BadRequest(`${fieldName} is invalid.`);
  }
};

const buildCartItem = ({ menuItemId, name, price, quantity }) => {
  return {
    menuItemId,
    name: name.trim(),
    price,
    quantity,
    totalPrice: price * quantity,
  };
};

const getUserCart = async (userId) => {
  const cart = await findCartByUserId(userId);
  if (!cart) {
    return upsertCartByUserId(userId, { $setOnInsert: { userId, items: [] } });
  }
  validateCartOwnership(cart, userId);
  return cart;
};

const addItemToCart = async (userId, payload) => {
  const { menuItemId } = payload;
  validateObjectId(menuItemId, "Menu item ID");

  const { default: menuDAO } = await import("../menu-management/menu.dao.js");
  const menuItem = await menuDAO.findById(menuItemId);
  if (!menuItem || menuItem.isAvailable === false) {
    const error = new Error("Menu item not found or unavailable.");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const nextItem = buildCartItem({
    menuItemId,
    name: menuItem.name,
    price: menuItem.price,
    quantity: payload.quantity,
  });
  const cart = await getUserCart(userId);
  validateCartOwnership(cart, userId);

  const existingItemIndex = cart.items.findIndex(
    (item) => item.menuItemId.toString() === nextItem.menuItemId
  );

  if (existingItemIndex >= 0) {
    const current = cart.items[existingItemIndex];
    current.quantity += nextItem.quantity;
    current.price = nextItem.price;
    current.name = nextItem.name;
    current.totalPrice = current.quantity * current.price;
  } else {
    cart.items.push(nextItem);
  }

  return saveCart(cart);
};

const updateCartItemQuantity = async (userId, menuItemId, quantity) => {
  validateObjectId(menuItemId, "Menu item ID");
  const cart = await findCartByUserId(userId);
  validateCartOwnership(cart, userId);

  const itemIndex = cart.items.findIndex((item) => item.menuItemId.toString() === menuItemId);
  if (itemIndex < 0) throw createError.NotFound("Cart item not found.");

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice = cart.items[itemIndex].price * quantity;
  }

  return saveCart(cart);
};

const removeCartItem = async (userId, menuItemId) => {
  validateObjectId(menuItemId, "Menu item ID");
  const cart = await findCartByUserId(userId);
  validateCartOwnership(cart, userId);

  const previousLength = cart.items.length;
  cart.items = cart.items.filter((item) => item.menuItemId.toString() !== menuItemId);

  if (cart.items.length === previousLength) {
    throw createError.NotFound("Cart item not found.");
  }

  return saveCart(cart);
};

const clearCart = async (userId) => {
  const cart = await findCartByUserId(userId);
  if (cart) {
    validateCartOwnership(cart, userId);
  }
  const clearedCart = await deleteCartItemsByUserId(userId);
  if (!clearedCart) {
    return upsertCartByUserId(userId, { $setOnInsert: { userId, items: [] } });
  }
  return clearedCart;
};

export { addItemToCart, updateCartItemQuantity, removeCartItem, getUserCart, clearCart };
