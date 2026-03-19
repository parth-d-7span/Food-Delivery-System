import type { Role } from "../../../constants/roles.js";

export interface JwtPayload {
  id: string;
  role: Role;
}
