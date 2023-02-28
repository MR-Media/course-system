import { Router } from "express";

import { get_quizzes } from "../controllers/quizController";

const isAuthorized = require("../middleware/auth");

export const quizRouter = Router();

quizRouter.get("/", isAuthorized, get_quizzes);
