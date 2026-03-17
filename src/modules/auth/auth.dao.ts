import type { PublicUser, UserCreateInput, UserRecord } from "../../types/user.types.js";

import User from "../users/user.model.js";

const findUserByEmail = async (email: string): Promise<PublicUser | null> =>
  User.findOne({ email }).select("-passwordHash").lean<PublicUser>();

const findUserByEmailWithPassword = async (email: string): Promise<UserRecord | null> =>
  User.findOne({ email }).select("+passwordHash").lean<UserRecord>();

const createUser = async (userData: UserCreateInput): Promise<UserRecord> => {
  const user = await User.create(userData);
  return user.toObject();
};

export { createUser, findUserByEmail, findUserByEmailWithPassword };
