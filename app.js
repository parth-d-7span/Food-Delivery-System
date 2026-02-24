const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Food Delivery System API is running 🚀",
  });
});

// ─── Routes ─────────────────────────────────────────────────────────────────
// TODO: Import and use module routes here
// const authRoutes = require("./modules/auth/auth.routes");
// const userRoutes = require("./modules/users/users.routes");
// const restaurantRoutes = require("./modules/restaurants/restaurants.routes");
// const orderRoutes = require("./modules/orders/orders.routes");

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/restaurants", restaurantRoutes);
// app.use("/api/v1/orders", orderRoutes);

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`,
  );
});

module.exports = app;
