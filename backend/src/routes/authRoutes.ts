import { signup, login, logout } from "../controllers/authController.js";
import { Router } from "express";
import { getMe } from "../controllers/getMe.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);
export default router;
