import {
  getAllUsers,
  getUser as getUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "./user.service.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, message: "Users fetched successfully.", data: { users } });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserService(id);
    res.status(200).json({ success: true, message: "User fetched successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, address } = req.body;
    await updateUserService(id, { name, phoneNumber, address });
    return res.status(200).json({ success: true, message: "User updated successfully." });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser, updateUser, deleteUser };
