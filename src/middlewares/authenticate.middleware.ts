import type { NextFunction, Request, Response } from "express";

import User from "../modules/users/user.model.js";
import type { PublicUser } from "../modules/users/user.types.js";
import { Unauthorized } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

const authenticate = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      next(Unauthorized("No token provided. Please login."));
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-passwordHash").lean<PublicUser>(); //lean : Return plain JS object (not Mongoose document)

    if (!user) {
      next(Unauthorized("User no longer exists."));
      return;
    }

    request.user = user;
    next();
  } catch {
    next(Unauthorized("Invalid or expired token. Please login again."));
  }
};

export default authenticate;
