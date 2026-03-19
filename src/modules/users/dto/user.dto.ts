import type { Types } from "mongoose";

import type { Role } from "../../../constants/roles.js";

export interface UserEntity {
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  address: string;
  role: Role;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRecord extends UserEntity {
  _id: Types.ObjectId;
}

export interface PublicUser extends Omit<UserRecord, "passwordHash"> {}

export interface AuthUser extends Pick<PublicUser, "_id" | "role"> {}

export interface UserCreateInput {
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  address: string;
  role: Role;
}

export interface UserUpdateInput {
  name?: string;
  phoneNumber?: string;
  address?: string;
}
