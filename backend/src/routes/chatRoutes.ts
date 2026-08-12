import { Router } from "express";
import { sendChatMessage } from "../controllers/chatController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router({mergeParams: true}); // let us read parameters from parent route
router.route("/").post(asyncHandler(sendChatMessage));

export default router;
