import { error, timeStamp } from "node:console";
import Diary from "../models/Diary.model.js";
import type { Request, Response } from "express";
import mongoose from "mongoose";

export const writeDiary = async (req: Request, res: Response) => {
    const {thought} = req.body;
    if(!thought){
        res.status(400);
        throw new Error(" ,,thought,, not present in the body");
    }
    const today = new Date().toISOString().slice(0,10);
    const userId = req.userId;
    if(!userId){
        throw new Error("....server error.....");
    }
    const todaysEntry = await Diary.findOne({
        user: new mongoose.Types.ObjectId(userId),
        timeStamp: today
    });

    if (todaysEntry){
        todaysEntry.content = todaysEntry.content + "\n" + thought ;
        todaysEntry.timeStamp = today;
        const upDatedEntry = await todaysEntry.save();

        return res.status(200).json(upDatedEntry);
    }else{
        const entry = await Diary.create({
            user: userId,
            content: thought,
            timeStamp: today
        })
        res.json(entry);
    }
}

export const loadDiary = async (req: Request, res: Response) => {

    const today = new Date().toISOString().slice(0,10);
    const userId = req.userId;
    if(!userId){
        return res.status(401).json({
                message: "Authentication required",
            });
    }
    const todaysEntry = await Diary.findOne({
        user: new mongoose.Types.ObjectId(userId),
        timeStamp: today
    });

    if(!todaysEntry){
        return res.json({"data":null});
    }else{
        return res.json({"data": todaysEntry.content});
    }
}