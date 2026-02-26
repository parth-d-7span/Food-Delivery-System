import mongoose from "mongoose";

import { MONGO_URI } from "../utils/env.js";

import logger from "./logger.js";

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);
  logger.info(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
