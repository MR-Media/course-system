import { Router } from "express";

import { isAuthorized } from "../middleware/auth";

import { get_quizzes } from "../controllers/quizController";

export const quizRouter = Router();

quizRouter.get("/", isAuthorized, get_quizzes);
