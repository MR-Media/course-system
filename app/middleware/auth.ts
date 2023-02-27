import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token is required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.decodedToken = decodedToken;
  } catch (error) {
    return res.status(401).send("Invalid token!");
  }

  return next();
};

module.exports = auth;
