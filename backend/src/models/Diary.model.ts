import {model, Schema} from "mongoose";

export interface UserEntry{
    content: string;
    timeStamp: string;
}

const UserEntrySchema = new Schema<UserEntry>({
    content: {type: String, required: true },
    timeStamp: {type: String, required: true}
});

const UserEntrymodel = model<UserEntry>("UserEntry", UserEntrySchema);

export default UserEntrymodel ;

