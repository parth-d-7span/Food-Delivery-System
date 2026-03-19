import type { PublicUser } from "./user.dto.js";

export interface UserPaginationQuery {
  page: number;
  limit: number;
}

export interface PaginatedUsers {
  users: PublicUser[];
  totalItems: number;
  totalPages: number;
}
