import httpStatus from "http-status";
import type { RequestHandler } from "express";

import type { TokenResponse } from "../../types/api.types.js";
import type { LoginInput, RegisterUserInput } from "../../types/auth.types.js";

import { login as loginUser, register as registerUser } from "./auth.service.js";

const register: RequestHandler<Record<string, never>, TokenResponse, RegisterUserInput> = async (
  request,
  response,
  next,
) => {
  try {
    const token = await registerUser(request.body);

    response.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully.",
      token,
    });
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

    response.status(httpStatus.OK).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { login, register };
