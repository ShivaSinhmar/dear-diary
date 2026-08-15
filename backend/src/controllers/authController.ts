import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





import User from "../models/User.model.js";
export const signup = async (req: Request, res: Response) => {
    try{
        const {userName, name, email, password} = req.body;

        // validate input
        if(!name || !email || !password){
            return res.status(400).json({
                message: "all feilds are required"
            });
        }

        // check if user already exist

        const existingUser = await User.findOne({
            email: email
        });
        if(existingUser){
            return res.status(409).json({
                message: "email already linked to an account"
            });
        }

        const existingUserName = await User.findOne({
            userName: userName
        });
        if(existingUserName){
            return res.status(409).json({
                message: "user name is taken"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            userName: userName,
            name: name,
            email: email,
            password: hashedPassword
        })

        // generate JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "15d"
            }
        );

        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                sameSite: "lax",
                //secure: process.env.NODE_ENV === "production",
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,

            }
        );

        return res.status(201).json({
            message: "user Created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });
        
    } catch(err){
        console.log("error while creating the user: ", err);

        return res.status(500).json({
            message: "server error",
        })
    }
}



// login controller

export const login = async (req: Request, res: Response) => {
    const { email, password} = req.body;

    // validate entries

    if(! email || ! password){
        return res.status(400).json(
            {
                message: "all feilds are required"
            });
    }

    try {

        const user = await User.findOne({
            email: email,
        });




        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "14d",
            }
        );

        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                //secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,

            }
        );


        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });


    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server error",
        });
    }
};


export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    res.status(200).json({
        message: "Loged out successfully"
    });
};


