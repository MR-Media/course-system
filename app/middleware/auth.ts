import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token is required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "");
    req.decodedToken = decodedToken as any; // TODO: Find a way to type this
  } catch (error) {
    return res.status(401).send("Invalid token!");
  }

  return next();
};
