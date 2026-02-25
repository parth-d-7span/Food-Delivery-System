const ApiError = require("../utils/ApiError");

module.exports = (role) => {

  return (req, res, next) => {

    if (req.user.role !== role)
      return next(
        new ApiError(
          403,
          "Access denied"
        )
      );

    next();
  };

};