import mongoose from "mongoose";

import { MONGO_URI } from "../utils/env.js";

import logger from "./logger.js";

const connectDB = async (): Promise<void> => {
  const connection = await mongoose.connect(MONGO_URI);
  logger.info(`MongoDB Connected: ${connection.connection.host}`);
};

export default connectDB;
