import express, { Request, Response } from "express";

import { quizRouter } from "./routes/quiz";

require("dotenv").config();
require("./configs/database").connect();

// Initialize express
const server = express();

// Set up middleware
server.use(express.json());

// Set up routes
server.use("/users", require("./routes/user"));
server.use("/quizzes", quizRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default server;
