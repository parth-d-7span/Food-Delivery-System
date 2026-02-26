import User from "../users/user.model.js";

const findUserByEmail = async (email) => User.findOne({ email });

const findUserByEmailWithPassword = async (email) =>
  User.findOne({ email }).select("+passwordHash");

const createUser = async (userData) => User.create(userData);

export { findUserByEmail, findUserByEmailWithPassword, createUser };
