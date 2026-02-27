import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

const verifyPassword = async (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

export { hashPassword, verifyPassword };
