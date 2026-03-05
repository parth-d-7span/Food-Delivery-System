import User from "./user.model.js";

const findAllUsers = async () => User.find().select("-passwordHash");

const findUserById = async (id) => User.findById(id).select("-passwordHash");

const updateUserById = async (id, data) =>
  User.findByIdAndUpdate(id, data, { returnDocument: "after" }).select(
    "-passwordHash",
  );

const DeleteUserById = async (id) =>
  User.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { returnDocument: "after" },
  );

export { findAllUsers, findUserById, updateUserById, DeleteUserById };
