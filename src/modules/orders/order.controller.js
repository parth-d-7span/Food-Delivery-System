import {
  placeOrder,
  getOrder,
  getMyOrders,
  getAllOrders,
  cancelOrder,
  updateStatus,
} from "./order.service.js";

const placeOrderHandler = async (req, res, next) => {
  try {
    const { deliveryAddress } = req.body;
    const order = await placeOrder({
      userId: req.user._id,
      deliveryAddress,
    });
    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getMyOrders(req.user._id);
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully.",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully.",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

const getOrderHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order, orderItems } = await getOrder(id, req.user);
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully.",
      data: { order, orderItems },
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrderHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await cancelOrder(id, req.user);
    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateStatus(id, status);
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export {
  placeOrderHandler,
  getMyOrdersHandler,
  getAllOrdersHandler,
  getOrderHandler,
  cancelOrderHandler,
  updateStatusHandler,
};
