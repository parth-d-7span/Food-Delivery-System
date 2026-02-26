import createError from "http-errors";

import {
  findAllUsers,
  findUserById,
  updateUserById,
  softDeleteUserById,
} from "./user.dao.js";

const getAllUsers = async () => findAllUsers();

const getUser = async (id) => {
  const user = await findUserById(id);
  if (!user) {throw createError.NotFound("User not found.");}
  return user;
};

const updateUser = async (id, data) => {
  const allowedFields = ["name", "phoneNumber", "address"];
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );
  const user = await updateUserById(id, filteredData);
  if (!user) {throw createError.NotFound("User not found.");}
};

const deleteUser = async (id) => {
  const user = await softDeleteUserById(id);
  if (!user) {throw createError.NotFound("User not found.");}
};

export { getAllUsers, getUser, updateUser, deleteUser };
