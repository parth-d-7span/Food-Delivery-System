import express from "express";
import { API_PREFIX, PORT, NODE_ENV } from "./src/utils/env.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import userRoutes from "./src/modules/users/user.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import restaurantRoutes from "./src/modules/restaurant/restaurant.routes.js";
import menuRoutes from "./src/modules/menu-management/menu.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Food Delivery System API is running." });
  res.json({ success: true, message: "Food Delivery System API is running." });
});

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/restaurants`,restaurantRoutes);
app.use(`${API_PREFIX}/menu`,menuRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} [${NODE_ENV}]`);
  });
};
app.use(errorHandler);



startServer();
startServer();