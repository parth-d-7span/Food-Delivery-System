import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateUserSchema } from "./user.validation.js";
import ROLES from "../../constants/roles.js";

import { getUsers, getUser, updateUser, deleteUser } from "./user.controller.js";

const router = Router();

router.get("/", authenticate, authorize(ROLES.ADMIN), getUsers);
router.get("/:id", authenticate, getUser);
router.put("/:id", authenticate, validate(updateUserSchema), updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
