import User from "../users/user.model.js";

const findUserByEmail = async (email) => await User.findOne({ email });

const findUserByEmailWithPassword = async (email) =>
  await User.findOne({ email }).select("+passwordHash");

const createUser = async (userData) => await User.create(userData);

export { findUserByEmail, findUserByEmailWithPassword, createUser };
