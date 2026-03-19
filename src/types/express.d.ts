import type { PublicUser } from "../modules/users/user.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
      validatedQuery?: unknown;
    }
  }
}

export {};
