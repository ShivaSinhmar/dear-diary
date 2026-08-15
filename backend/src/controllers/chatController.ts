// import type { Request, Response } from "express";
// import Entry from "../models/Entry.model.js"; 

// import { getDiaryChatResponse } from "../services/aiService.js";

// export const sendChatMessage = async (req: Request, res: Response) => {
//     const {message} = req.body;
//     if (!message) {
//         res.status(400);
//         throw new Error("Message is required");
//     }

//     const entry = await Entry.findById(req.params.id);
//     if (!entry) {
//         res.status(404);
//         throw new Error("Entry not found");
//     }

//     const diaryReply = await getDiaryChatResponse(entry.content, entry.chatMessages, message);

//     entry.chatMessages.push({ role: "user", content: message, timeStamp: new Date() });
//     entry.chatMessages.push({ role: "diary", content: diaryReply, timeStamp: new Date() });

//     await entry.save();
//     res.json(entry);
// }

