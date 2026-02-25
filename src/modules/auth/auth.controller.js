import { register as registerUser, login as loginUser } from "./auth.service.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, address, role } = req.body;
    const token = await registerUser({ name, email, password, phoneNumber, address, role });

    res.status(201).json({
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

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login };