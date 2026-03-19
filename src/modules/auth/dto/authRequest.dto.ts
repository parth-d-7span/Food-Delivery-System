import type { Role } from "../../../constants/roles.js";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role?: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}
