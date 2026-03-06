import httpStatus from "http-status";

import { register as registerUser, login as loginUser } from "./auth.service.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, address, role } = req.body;
    const token = await registerUser({ name, email, password, phoneNumber, address, role });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login };
