import type { PublicUser } from "./user.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
      validatedQuery?: unknown;
    }
  }
}

export {};
