import express, { type Request, type Response } from "express";

import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import requestLogger from "./src/middlewares/requestLogger.middleware.js";
import router from "./src/router.js";
import { API_PREFIX, NODE_ENV, PORT } from "./src/utils/env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/", (_request: Request, response: Response) => {
  response.json({ success: true, message: "Food Delivery System API is running." });
});

app.use(API_PREFIX, router);                  

app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT} [${NODE_ENV}]`);
  });
};

void startServer();