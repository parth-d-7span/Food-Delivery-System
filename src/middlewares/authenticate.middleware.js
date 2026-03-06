import { Unauthorized } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";
import User from "../modules/users/user.model.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(Unauthorized("No token provided. Please login."));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return next(Unauthorized("User no longer exists."));
    }

    req.user = user;
    next();
  } catch {
    return next(
      Unauthorized("Invalid or expired token. Please login again."),
    );
  }
};

export default authenticate;
