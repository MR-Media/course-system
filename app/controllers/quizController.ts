import { Request, Response } from "express";

import { Quiz } from "../models/Quiz";

const get_quizzes = async (req: Request, res: Response) => {
  const quizzes = await Quiz.find();

  if (!quizzes) {
    return res.status(404).send("User not found");
  }

  return res.send(quizzes);
};

export { get_quizzes };
