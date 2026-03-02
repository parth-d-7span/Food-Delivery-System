import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import restaurantRoutes from "./modules/restaurant/restaurant.routes.js";
import menuRoutes from "./modules/menu-management/menu.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);

export default router;