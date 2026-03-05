import express from "express";

import { API_PREFIX, PORT, NODE_ENV } from "./src/utils/env.js";
import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";
import requestLogger from "./src/middlewares/requestLogger.middleware.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import router from "./src/router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Food Delivery System API is running." });
});

app.use(`${API_PREFIX}`, router);

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

startServer();