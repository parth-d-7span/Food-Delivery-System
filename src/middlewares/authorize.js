import createError from "http-errors";

const authorize =
  (...roles) =>
    (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          createError.Forbidden(
            `Access denied. Only ${roles.join(", ")} can access this.`,
          ),
        );
      }
      next();
    };

export default authorize;
