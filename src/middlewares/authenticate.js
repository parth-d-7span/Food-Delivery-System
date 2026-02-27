import createError from "http-errors";
import { verifyToken } from "../utils/jwt.js";
import User from "../modules/users/user.model.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(createError.Unauthorized("No token provided. Please login."));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-passwordHash");
console.log("Authenticated user:", user);
    if (!user) {
      return next(createError.Unauthorized("User no longer exists."));
    }

    req.user = user;
    next();
  } catch {
    return next(
      createError.Unauthorized("Invalid or expired token. Please login again."),
    );
  }
};

export default authenticate;
