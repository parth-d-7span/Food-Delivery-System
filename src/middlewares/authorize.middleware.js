import { Forbidden } from "../utils/errors.js";

const authorize =
  (...roles) =>
    (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          Forbidden(
            `Access denied. Only ${roles.join(", ")} can access this.`,
          ),
        );
      }
      next();
    };

export default authorize;
