import mongoose from "mongoose";
export const connectDB =async() => {
    
    const uri = process.env.MONGODB_URI ;

    if(!uri){
        throw new Error("uri is not defined in env");
    }

    try {
        await mongoose.connect(uri);
        console.log("mogodb connected");
        
    } catch (err) {
        console.log("mongodb connection error :", err);
        process.exit(1)
    }
}