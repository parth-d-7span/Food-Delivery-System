import type {
  PaginatedUsers,
  UserPaginationQuery,
} from "./dto/userQuery.dto.js";
import type { PublicUser, UserUpdateInput } from "./dto/user.dto.js";
import { NotFound } from "../../utils/errors.js";

import { deleteUserById, findAllUsers, findUserById, updateUserById } from "./user.dao.js";

const getAllUsers = async ({ page, limit }: UserPaginationQuery): Promise<PaginatedUsers> => {
  const { users, totalItems } = await findAllUsers(page, limit);

  return {
    users,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};

const getUser = async (id: string): Promise<PublicUser> => {
  const user = await findUserById(id);

  if (!user) {
    throw NotFound("User not found.");
  }

  return user;
};

const updateUser = async (id: string, data: UserUpdateInput): Promise<void> => {
  const allowedFields: Array<keyof UserUpdateInput> = ["name", "phoneNumber", "address"];
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => allowedFields.includes(key as keyof UserUpdateInput) && value !== undefined),
  ) as UserUpdateInput;

  const user = await updateUserById(id, filteredData);

  if (!user) {
    throw NotFound("User not found.");
  }
};

const deleteUser = async (id: string): Promise<void> => {
  const user = await deleteUserById(id);

  if (!user) {
    throw NotFound("User not found.");
  }
};

export { deleteUser, getAllUsers, getUser, updateUser };
