import httpStatus from "http-status";
import type { NextFunction, RequestHandler, Response } from "express";

import type { ApiSuccessResponse } from "../../types/api.types.js";
import type { UpdateUserInput } from "../../types/auth.types.js";
import type { PaginatedUsers, PublicUser, UserPaginationQuery } from "../../types/user.types.js";

import {
  deleteUser as deleteUserService,
  getAllUsers as getAllUsersService,
  getUser as getUserService,
  updateUser as updateUserService,
} from "./user.service.js";

type IdParams = { id: string };

const getAllUsers: RequestHandler<
  Record<string, never>,
  ApiSuccessResponse<PaginatedUsers>
> = async (request, response, next) => {
  try {
    const users = await getAllUsersService(request.validatedQuery as UserPaginationQuery);
    response
      .status(httpStatus.OK)
      .json({ success: true, message: "Users fetched successfully.", data: users });
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
    response
      .status(httpStatus.OK)
      .json({ success: true, message: "User fetched successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler<IdParams, ApiSuccessResponse, UpdateUserInput> = async (
  request,
  response: Response<ApiSuccessResponse>,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    await updateUserService(id, request.body);
    response.status(httpStatus.OK).json({ success: true, message: "User updated successfully." });
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
    response.status(httpStatus.OK).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export { deleteUser, getAllUsers, getUser, updateUser };
