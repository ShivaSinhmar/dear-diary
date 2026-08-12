// here we wire everything together

import express from "express";
import cors from "cors";
import entryRoutes from "./routes/entryRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("backend is running")
});

app.use("/api/entries", entryRoutes);
app.use("/api/entries/:id/chat", chatRoutes);
app.use("/api/diary", diaryRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;

