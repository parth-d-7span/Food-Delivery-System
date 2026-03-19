import type { NextFunction, Request, RequestHandler, Response } from "express";

import type { Role } from "../constants/roles.js";

import { Forbidden, Unauthorized } from "../utils/errors.js";

const authorize =
  (...roles: Role[]): RequestHandler =>   
  (request: Request, _response: Response, next: NextFunction): void => {
    if (!request.user) {
      next(Unauthorized("No token provided. Please login."));
      return;
    }

    if (!roles.includes(request.user.role)) {
      next(Forbidden(`Access denied. Only ${roles.join(", ")} can access this.`));
      return;
    }

    next();
  };

export default authorize;
