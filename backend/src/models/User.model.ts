import mongoose, { Model, Schema, Document } from "mongoose";

export interface User extends Document{
    userName: string;
    name:     string;
    email:    string;
    password: string
};

const UserSchema = new Schema<User>({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },

},{
    timestamps: true,
});

export default mongoose.model<User>("User",  UserSchema);

