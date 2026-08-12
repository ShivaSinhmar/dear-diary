
import { writeDiary, loadDiary } from "../controllers/diaryController.js";
import { Router } from "express";

const router = Router();

router.route("/write").post(writeDiary);
router.route("/loadDiary").get(loadDiary);




export default router;