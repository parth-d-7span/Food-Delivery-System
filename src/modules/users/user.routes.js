import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { updateUserSchema } from "../../config/schemas.js";
import ROLES from "../../constants/roles.js";

import { getUsers, getUser, updateUser, deleteUser } from "./user.controller.js";


const router = Router();

// GET    /api/v1/users        — admin gets all users
router.get("/", authenticate, authorize(ROLES.ADMIN), getUsers);

// GET    /api/v1/users/:id    — self or admin gets user by id
router.get("/:id", authenticate, getUser);

// PUT    /api/v1/users/:id    — self updates own profile by id
router.put("/:id", authenticate, validate(updateUserSchema), updateUser);

// DELETE /api/v1/users/:id    — soft delete by self or admin
router.delete("/:id", authenticate, deleteUser);

export default router;
