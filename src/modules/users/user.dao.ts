import User, { type UserDocument } from "./user.model.js";

import type { PublicUser, UserUpdateInput } from "../../types/user.types.js";

const findAllUsers = async (
  page: number,
  limit: number,
): Promise<{ users: PublicUser[]; totalItems: number }> => {
  const skip = (page - 1) * limit;

  const [users, totalItems] = await Promise.all([
    User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-passwordHash")
      .lean<PublicUser[]>(),
    User.countDocuments({ deletedAt: null }),
  ]);

  return { users, totalItems };
};

const findUserById = async (id: string): Promise<PublicUser | null> =>
  User.findById(id).select("-passwordHash").lean<PublicUser>();

const updateUserById = async (id: string, data: UserUpdateInput): Promise<PublicUser | null> =>
  User.findByIdAndUpdate(id, data, { returnDocument: "after" })
    .select("-passwordHash")
    .lean<PublicUser>();

const deleteUserById = async (id: string): Promise<UserDocument | null> =>
  User.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { returnDocument: "after" },
  );

export { deleteUserById, findAllUsers, findUserById, updateUserById };
