import httpStatus from "http-status";

import {
  addItemToCart as addItemToCartService,
  updateCartItemQuantity as updateCartItemQuantityService,
  removeCartItem as removeCartItemService,
  getUserCart as getUserCartService,
  clearCart as clearCartService,
} from "./cart.service.js";

const getAuthUserId = (req) => req.user._id.toString();

const addItemToCart = async (req, res, next) => {
  try {
    const userId = getAuthUserId(req);
    const cart = await addItemToCartService(userId, req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Item added to cart successfully.",
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

const updateItemQuantity = async (req, res, next) => {
  try {
    const userId = getAuthUserId(req);
    const { menuItemId, quantity } = req.body;
    const cart = await updateCartItemQuantityService(userId, menuItemId, quantity);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Cart item quantity updated successfully.",
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

const removeItemFromCart = async (req, res, next) => {
  try {
    const userId = getAuthUserId(req);
    const { menuItemId } = req.params;
    const cart = await removeCartItemService(userId, menuItemId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Item removed from cart successfully.",
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const userId = getAuthUserId(req);
    const cart = await getUserCartService(userId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Cart fetched successfully.",
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

const clearUserCart = async (req, res, next) => {
  try {
    const userId = getAuthUserId(req);
    const cart = await clearCartService(userId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Cart cleared successfully.",
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

export { addItemToCart, updateItemQuantity, removeItemFromCart, getCart, clearUserCart };
