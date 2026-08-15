// import type { Request, Response } from "express";

// import Entry from "../models/Entry.model.js";
// import { generatePoeticSummary } from "../services/aiService.js";

// export const createEntry = async (req: Request, res: Response) => {
//     const {content, mood} =req.body;
//     if(!content){
//         res.status(400);
//         throw new Error("Entry content is required");
//     }

//     const poeticSummary = await generatePoeticSummary(content);
//     const entry = await Entry.create({content, mood, poeticSummary});
//     res.status(201).json(entry);
// };


// export const getEntries = async (req: Request, res: Response) => {
//   const entries = await Entry.find().sort({ createdAt: -1 });
//   res.json(entries);
// };

// export const getEntryById = async (req: Request, res: Response) => {
//     const entry = await Entry.findById(req.params.id);

//     if(!entry){
//         res.status(404);
//         throw new Error("Entry not found");
//     }

//     res.json(entry);
// }

// export const updateEntry = async (req: Request, res: Response) => {
//     const entry = await Entry.findById(req.params.id);
//     if (!entry) {
//         res.status(404);
//         throw new Error("Entry not found");
//     }

//     entry.mood = req.body.mood ?? entry.mood;
//     await entry.save();
//     res.json(entry);

// };


// export const deleteEntry = async (req: Request, res: Response) => {
//   const entry = await Entry.findById(req.params.id);
//   if (!entry) {
//     res.status(404);
//     throw new Error("Entry not found");
//   }
//   await entry.deleteOne();
//   res.json({ message: "Entry deleted" });
// };

