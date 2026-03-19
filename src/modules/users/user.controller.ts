import httpStatus from "http-status";
import type { NextFunction, RequestHandler, Response } from "express";

import type { ApiSuccessResponse, PaginationMeta } from "../../types/api.types.js";
import type { PaginatedUsers, UserPaginationQuery } from "./dto/userQuery.dto.js";
import type { PublicUser, UserUpdateInput } from "./dto/user.dto.js";

import {
  deleteUser as deleteUserService,
  getAllUsers as getAllUsersService,
  getUser as getUserService,
  updateUser as updateUserService,
} from "./user.service.js";

type IdParams = { id: string };

const getAllUsers: RequestHandler<
  Record<string, never>,
  ApiSuccessResponse<{ users: PublicUser[] }, PaginationMeta & { totalItems: number; totalPages: number }>
> = async (request, response, next) => {
  try {
    const users = await getAllUsersService(request.validatedQuery as UserPaginationQuery);
    const validatedQuery = request.validatedQuery as UserPaginationQuery;
    const body: ApiSuccessResponse<
      { users: PublicUser[] },
      PaginationMeta & { totalItems: number; totalPages: number }
    > = {
      success: true,
      message: "Users fetched successfully.",
      data: { users: users.users },
      meta: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        offset: (validatedQuery.page - 1) * validatedQuery.limit,
        totalItems: users.totalItems,
        totalPages: users.totalPages,
      },
    };

    response.status(httpStatus.OK).json(body);
  } catch (error) {
    next(error);
  }
};

const getUser: RequestHandler<
  IdParams,
  ApiSuccessResponse<{ user: PublicUser }>
> = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await getUserService(id);
    const body: ApiSuccessResponse<{ user: PublicUser }> = {
      success: true,
      message: "User fetched successfully.",
      data: { user },
    };

    response.status(httpStatus.OK).json(body);
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler<IdParams, ApiSuccessResponse, UserUpdateInput> = async (
  request,
  response: Response<ApiSuccessResponse>,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    await updateUserService(id, request.body);
    const body: ApiSuccessResponse = {
      success: true,
      message: "User updated successfully.",
    };

    response.status(httpStatus.OK).json(body);
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler<IdParams, ApiSuccessResponse> = async (
  request,
  response,
  next,
) => {
  try {
    const { id } = request.params;
    await deleteUserService(id);
    const body: ApiSuccessResponse = {
      success: true,
      message: "User deleted successfully.",
    };

    response.status(httpStatus.OK).json(body);
  } catch (error) {
    next(error);
  }
};

export { deleteUser, getAllUsers, getUser, updateUser };
