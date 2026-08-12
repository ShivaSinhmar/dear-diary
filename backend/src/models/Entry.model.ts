import {model, Schema, Document} from "mongoose";

export interface IChatMessage{
    role: "user"| "diary";
    content: string;
    timeStamp: Date;
}

export interface Ientry extends Document{
    content: string;
    poeticSummary: string,
    mood: string,
    chatMessages: IChatMessage[];
    createdAt:Date;
    updatedAt: Date
}

const chatMessageSchema = new Schema<IChatMessage>({

    role: {type: String, enum:["user", "diary"]},
    content: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now}

},{ _id: false}
);

const EntrySchema = new Schema<Ientry>({

    content: { type: String, required: true },
    poeticSummary: { type: String, default: "" },
    mood: { type: String },
    chatMessages: { type: [chatMessageSchema], default: [] },
},{timestamps: true});

export default model<Ientry>("Entry", EntrySchema);






