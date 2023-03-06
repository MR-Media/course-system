import { Router } from "express";

import { isAuthorized } from "../middleware/auth";

import {
  delete_quiz,
  get_quizzes,
  post_quiz,
} from "../controllers/quizController";

export const quizRouter = Router();

quizRouter.get("/", isAuthorized, get_quizzes);
quizRouter.post("/", isAuthorized, post_quiz);
quizRouter.delete("/", isAuthorized, delete_quiz);
