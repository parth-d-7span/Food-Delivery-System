import type { AuthUser, PublicUser, UserCreateInput, UserRecord } from "../../types/user.types.js";
import { verifyPassword } from "../../utils/hash.js";

import User from "../users/user.model.js";

type UserWithPassword = Pick<UserRecord, "_id" | "role" | "passwordHash">;

const findUserByEmail = async (email: string): Promise<PublicUser | null> =>
  User.findOne({ email }).select("-passwordHash").lean<PublicUser>();

const findVerifiedUserByEmail = async (
  email: string,
  password: string,
): Promise<AuthUser | null> => {
  const user = await User.findOne({ email })
    .select({ _id: 1, role: 1, passwordHash: 1 })
    .lean<UserWithPassword>();

  if (!user) {
    return null;
  }

  const isMatch = await verifyPassword(password, user.passwordHash);

  if (!isMatch) {
    return null;
  }

  return { _id: user._id, role: user.role };
};

const createUser = async (userData: UserCreateInput): Promise<AuthUser> => {
  const user = await User.create(userData);
  return { _id: user._id, role: user.role };
};

export { createUser, findUserByEmail, findVerifiedUserByEmail };
