import createHttpError, { type HttpError } from "http-errors";

const createErrorFactory =
  <TArgs extends [message?: string]>(factory: (...args: TArgs) => HttpError) =>
  (...args: TArgs): HttpError =>
    factory(...args);

export const BadRequest = createErrorFactory(createHttpError.BadRequest);
export const Unauthorized = createErrorFactory(createHttpError.Unauthorized);
export const Forbidden = createErrorFactory(createHttpError.Forbidden);
export const NotFound = createErrorFactory(createHttpError.NotFound);
export const Conflict = createErrorFactory(createHttpError.Conflict);
export const InternalServerError = (message?: string): HttpError =>
  createHttpError.InternalServerError(message ?? "Internal Server Error");
