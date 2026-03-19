import type { NextFunction, Request, RequestHandler, Response } from "express";

import ROLES from "../constants/roles.js";
import { Forbidden, Unauthorized } from "../utils/errors.js";

const authorizeUserAccess: RequestHandler = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  if (!request.user) {
    next(Unauthorized("No token provided. Please login."));
    return;
  }

  const requestedUserId = request.params.id;

  if (!requestedUserId) {
    next(Forbidden("Access denied."));
    return;
  }

  if (
    request.user.role !== ROLES.ADMIN &&
    request.user._id.toString() !== requestedUserId
  ) {
    next(Forbidden("You are not allowed to access this user."));
    return;
  }

  next();
};

export default authorizeUserAccess;
