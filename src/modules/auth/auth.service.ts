import logger from "../../config/logger.js";
import ROLES from "../../constants/roles.js";
import type { LoginInput, RegisterUserInput } from "./auth.dto.js";
import type { JwtPayload } from "./auth.types.js";
import { Conflict, Unauthorized } from "../../utils/errors.js";
import { hashPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

import { createUser, findUserByEmail, findVerifiedUserByEmail } from "./auth.dao.js";

const buildTokenPayload = (id: string, role: JwtPayload["role"]): JwtPayload => ({ id, role });

const register = async ({
  name,
  email,
  password,
  phoneNumber,
  address,
  role,
}: RegisterUserInput): Promise<string> => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw Conflict("This email is already registered.");
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({
    name,
    email,
    passwordHash,
    phoneNumber,
    address,
    role: role ?? ROLES.CUSTOMER,
  });

  logger.info(`New user registered: ${email} [${user.role}]`);

  return generateToken(buildTokenPayload(user._id.toString(), user.role));
};

const login = async ({ email, password }: LoginInput): Promise<string> => {
  const user = await findVerifiedUserByEmail(email, password);

  if (!user) {
    throw Unauthorized("Invalid email or password.");
  }

  logger.info(`User logged in: ${email}`);

  return generateToken(buildTokenPayload(user._id.toString(), user.role));
};

export { login, register };
