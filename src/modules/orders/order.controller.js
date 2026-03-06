import httpStatus from "http-status";

import {
  placeOrder as placeOrderService,
  getOrder as getOrderService,
  getOrders as getOrdersService,
  getAllOrders as getAllOrdersService,
  cancelOrder as cancelOrderService,
  updateStatus as updateStatusService,
} from "./order.service.js";

const placeOrder = async (req, res, next) => {
  try {
    const { deliveryAddress } = req.body;
    const order = await placeOrderService({
      userId: req.user._id,
      deliveryAddress,
    });
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Order placed successfully.",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await getOrdersService(req.user._id);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Orders fetched successfully.",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService();
    return res.status(httpStatus.OK).json({
      success: true,
      message: "All orders fetched successfully.",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order, orderItems } = await getOrderService(id, req.user);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Order fetched successfully.",
      data: { order, orderItems },
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await cancelOrderService(id, req.user);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Order cancelled successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateStatusService(id, status);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Order status updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export { placeOrder, getMyOrders, getAllOrders, getOrder, cancelOrder, updateStatus };
