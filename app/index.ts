import { Request, Response } from "express";

require("dotenv").config();
require("./configs/database").connect();

const express = require("express");

// Initialize express
const server = express();

// Set up middleware
server.use(express.json());

// Set up routes
server.use("/user", require("./routes/user"));

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default server;
