import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload{
    userId: string;
};



export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        // // get auth header
        // const authHeader = req.headers.authorization;


        // if(!authHeader){
        //     return res.status(401).json({
        //         message: "Authentication required"
        //     });
        // }

        // // expected : Authorization : Bearer Token

        // const parts = authHeader.split(" ");

        // if (parts.length !== 2 || parts[0] !== "Bearer") {
        //     return res.status(401).json({
        //         message: "Invalid authorization format",
        //     });
        // }

        // const token = parts[1];

        const token = req.cookies.token;
        console.log()
        
        if(!token){
            return res.status(401).json({
                message: "invalid format"
            });
        }

        // verify token

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET 
        ) as JwtPayload;

        
        req.userId = decoded.userId;

        // continues to controller
        next();


    }catch(err){
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
