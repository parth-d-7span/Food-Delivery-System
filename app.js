import express from "express";

import { API_PREFIX, PORT, NODE_ENV } from "./src/utils/env.js";
import connectDB from "./src/config/db.js";
import logger from "./src/utils/logger.js";
import requestLogger from "./src/middlewares/requestLogger.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import userRoutes from "./src/modules/users/user.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import restaurantRoutes from "./src/modules/restaurant/restaurant.routes.js";
import menuRoutes from "./src/modules/menu-management/menu.routes.js";
import orderRoutes from "./src/modules/orders/order.routes.js";
import cartRoutes from "./src/modules/cart/cart.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Food Delivery System API is running." });
});

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/restaurants`, restaurantRoutes);
app.use(`${API_PREFIX}/menu`, menuRoutes);
app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/cart`,cartRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT} [${NODE_ENV}]`);
  });
};
app.use(errorHandler);

startServer();
