import type{ Request, Response } from "express";
import User from "../models/User.model.js";



export const getMe = async(req: Request, res: Response) => {


    const user = await User.findById(req.userId)
        .select("-password");

        console.log(req.userId);
        console.log(user);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    
    res.json({
        user
    });

}
