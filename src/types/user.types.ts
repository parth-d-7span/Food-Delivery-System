import type { Types } from "mongoose";

import type { Role } from "../constants/roles.js";

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

export type PublicUser = Omit<UserRecord, "passwordHash">;  //Create a new type from Type but remove some keys.(Take UserRecord , remove passwordHash property)

export interface UserPaginationQuery {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedUsers {
  users: PublicUser[];
  pagination: PaginationMeta;
}

export interface UserCreateInput {
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  address: string;
  role: Role;
}

export type UserUpdateInput = Partial<Pick<UserEntity, "name" | "phoneNumber" | "address">>; //Create a new type using only selected fields from another type.
