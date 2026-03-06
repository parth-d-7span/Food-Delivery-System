import createHttpError from "http-errors";

export const BadRequest = (message) => createHttpError.BadRequest(message);
export const Unauthorized = (message) => createHttpError.Unauthorized(message);
export const Forbidden = (message) => createHttpError.Forbidden(message);
export const NotFound = (message) => createHttpError.NotFound(message);
export const Conflict = (message) => createHttpError.Conflict(message);
export const InternalServerError = (message) =>
  createHttpError.InternalServerError(message || "Internal Server Error");
