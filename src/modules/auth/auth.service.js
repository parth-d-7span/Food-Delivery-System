import createError from "http-errors";

import { hashPassword, verifyPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";
import logger from "../../config/logger.js";

import { findUserByEmail, findUserByEmailWithPassword, createUser } from "./auth.dao.js";

const register = async ({ name, email, password, phoneNumber, address, role }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {throw createError.Conflict("This email is already registered.");}

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
    phoneNumber,
    address,
    role: role || "customer",
  });

  logger.info(`New user registered: ${email} [${user.role}]`);

  return generateToken({ id: user._id, role: user.role });
};

const login = async ({ email, password }) => {
  const user = await findUserByEmailWithPassword(email);
  if (!user) {throw createError.Unauthorized("Invalid email or password.");}

  const isMatch = await verifyPassword(password, user.passwordHash);
  if (!isMatch) {throw createError.Unauthorized("Invalid email or password.");}

  logger.info(`User logged in: ${email}`);

  return generateToken({ id: user._id, role: user.role });
};

export { register, login };
