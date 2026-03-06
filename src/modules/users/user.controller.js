import httpStatus from "http-status";

import {
  getAllUsers as getAllUsersService,
  getUser as getUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "./user.service.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    return res
      .status(httpStatus.OK)
      .json({ success: true, message: "Users fetched successfully.", data: { users } });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserService(id);
    return res
      .status(httpStatus.OK)
      .json({ success: true, message: "User fetched successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, address } = req.body;
    await updateUserService(id, { name, phoneNumber, address });
    return res.status(httpStatus.OK).json({ success: true, message: "User updated successfully." });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    return res.status(httpStatus.OK).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUser, updateUser, deleteUser };
