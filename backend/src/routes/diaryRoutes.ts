
import { writeDiary, loadDiary } from "../controllers/diaryController.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/write",authMiddleware, writeDiary);
router.get("/loadDiary", authMiddleware, loadDiary);


export default router;