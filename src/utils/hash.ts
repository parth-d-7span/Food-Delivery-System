import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, SALT_ROUNDS);

const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => bcrypt.compare(password, hashedPassword);

export { hashPassword, verifyPassword };
