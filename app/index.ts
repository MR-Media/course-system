import { Request, Response } from "express";

require("dotenv").config();
require("./configs/database").connect();

const express = require("express");

const userRoute = require("./routes/user");

// Initialize express
const server = express();

// Set up middleware
server.use(express.json());

// Set up routes
server.use("/user", userRoute);

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default server;
