// import { isHttpError } from "http-errors";

// const errorHandler = (err, req, res, next) => {
//   if (isHttpError(err)) {
//     return res.status(err.status).json({
//       success: false,
//       message: err.message,
//     });
//   }

//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// };

// export default errorHandler;

const errorHandler = (err, req, res, next) => {

  console.error("FULL ERROR:", err);

  res.status(err.status || err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export default errorHandler;
