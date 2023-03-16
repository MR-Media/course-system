import { config } from "dotenv";
import express, { Request, Response } from "express";

import { connectDatabase } from "./configs/database";

import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/course";
import { moduleRouter } from "./routes/module";
import { lessonRouter } from "./routes/lesson";

// Setup .ENV
config();

// Initialize express
export const server = express();

// Connect to MongoDB with Mongoose
connectDatabase();

// Set up middleware
server.use(express.json());

// Set up routes
server.use("/users", userRouter);
server.use("/courses", courseRouter);
server.use("/modules", moduleRouter);
server.use("/lessons", lessonRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
