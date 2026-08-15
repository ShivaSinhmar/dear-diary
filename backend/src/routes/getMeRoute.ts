import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/getMe.js";

const router = Router();


router.get("/me", authMiddleware, getMe);