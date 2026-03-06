import { Router } from "express";

import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import ROLES from "../../constants/roles.js";

import { updateUserSchema } from "./user.validation.js";
import { getAllUsers, getUser, updateUser, deleteUser } from "./user.controller.js";

const router = Router();

router.get("/", authenticate, authorize(ROLES.ADMIN), getAllUsers);
router.get("/:id", authenticate, getUser);
router.put("/:id", authenticate, validate(updateUserSchema), updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
