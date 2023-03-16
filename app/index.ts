import { config } from "dotenv";
import express, { Request, Response } from "express";

import { connectDatabase } from "./configs/database";

import { userRouter } from "./routes/user";
import { quizRouter } from "./routes/quiz";
import { courseRouter } from "./routes/course";
import { moduleRouter } from "./routes/module";

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
server.use("/quizzes", quizRouter);
server.use("/courses", courseRouter);
server.use("/modules", moduleRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
