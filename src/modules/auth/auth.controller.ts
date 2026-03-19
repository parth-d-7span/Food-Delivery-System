import httpStatus from "http-status";
import type { RequestHandler } from "express";

import type { TokenResponse } from "../../types/api.types.js";
import { successResponse } from "../../utils/response.js";
import type { LoginInput, RegisterUserInput } from "./auth.dto.js";

import { login as loginUser, register as registerUser } from "./auth.service.js";

const register: RequestHandler<Record<string, never>, TokenResponse, RegisterUserInput> = async (
  request,
  response,
  next,
) => {
  try {
    const token = await registerUser(request.body);
    const body: TokenResponse = {
      success: true,
      message: "User registered successfully.",
      data: { token },
    };

    successResponse(response, httpStatus.CREATED, body);
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler<Record<string, never>, TokenResponse, LoginInput> = async (
  request,
  response,
  next,
) => {
  try {
    const token = await loginUser(request.body);
    const body: TokenResponse = {
      success: true,
      message: "Login successful.",
      data: { token },
    };

    successResponse(response, httpStatus.OK, body);
  } catch (error) {
    next(error);
  }
};

export { login, register };
