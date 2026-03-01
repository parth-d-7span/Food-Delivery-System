import {
  placeOrder,
  getOrder,
  getMyOrders,
  getAllOrders,
  cancelOrder,
  updateStatus,
} from "./order.service.js";

// POST /api/v1/orders
const placeOrderHandler = async (req, res, next) => {
  try {
    const { deliveryAddress } = req.body;
    const order = await placeOrder({
      userId: req.user._id,
      deliveryAddress,
    });
    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/orders/my — customer
const getMyOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getMyOrders(req.user._id);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully.",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/orders — admin only
const getAllOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully.",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/orders/:id
const getOrderHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order, orderItems } = await getOrder(id, req.user);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully.",
      data: { order, orderItems },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/orders/:id/cancel — customer
const cancelOrderHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await cancelOrder(id, req.user);
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/orders/:id/status — admin only
const updateStatusHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateStatus(id, status);
    res.status(200).json({
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
