import mongoose, {model, Schema} from "mongoose";
import { ref } from "node:process";

export interface UserEntry{
    user: mongoose.Types.ObjectId,
    
    content: string;
    timeStamp: string;
}

const UserEntrySchema = new Schema<UserEntry>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {type: String, required: true },
    timeStamp: {type: String, required: true}
});

const UserEntrymodel = model<UserEntry>("UserEntry", UserEntrySchema);

export default UserEntrymodel ;

