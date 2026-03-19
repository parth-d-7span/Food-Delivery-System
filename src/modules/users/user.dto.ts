import type { PublicUser } from "./user.types.js";

export interface UserUpdateInput {
  name?: string;
  phoneNumber?: string;
  address?: string;
}

export interface UserPaginationQuery {
  page: number;
  limit: number;
}

export interface PaginatedUsers {
  users: PublicUser[];
  totalItems: number;
  totalPages: number;
}
