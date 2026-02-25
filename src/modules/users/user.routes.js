import { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser } from "./user.controller.js";
import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";
import { validateUpdateUser } from "../../middlewares/validate.js";
import ROLES from "../../constants/roles.js";

const router = Router();

// GET    /api/v1/users        — admin gets all users
router.get("/", authenticate, authorize(ROLES.ADMIN), getUsers);

// GET    /api/v1/users/:id    — self or admin gets user by id
router.get("/:id", authenticate, getUser);

// PUT    /api/v1/users/:id    — self updates own profile by id
router.put("/:id", authenticate, validateUpdateUser, updateUser);

// DELETE /api/v1/users/:id    — soft delete by self or admin
router.delete("/:id", authenticate, deleteUser);

export default router;