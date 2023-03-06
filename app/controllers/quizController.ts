import { Request, Response } from "express";

import { IQuiz, Quiz } from "../models/Quiz";

export const get_quizzes = async (req: Request, res: Response) => {
  const quizzes = await Quiz.find();

  if (!quizzes) {
    return res.status(500).send("Something went wron fetching the quizzes");
  }

  return res.json(quizzes);
};

export const post_quiz = async (req: Request, res: Response) => {
  const { question, options, correctAnswer } = req.body as IQuiz;

  if (!(question && options && correctAnswer)) {
    return res.status(400).send("All fields are required!");
  }
  if (options.length < 2) {
    return res.status(400).send("Please provide at least 2 options");
  }
  if (options.length > correctAnswer) {
    return res
      .status(400)
      .send("You don't have enough options to get this answer");
  }
  if (!(correctAnswer >= 0 && correctAnswer <= 3)) {
    return res
      .status(400)
      .send("Correct answer is invalid, provide number (0-3)");
  }

  const quiz = await Quiz.create({
    question,
    options,
    correctAnswer,
  });

  return res.status(201).json(quiz);
};

export const delete_quiz = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const quiz = await Quiz.findOneAndDelete({ _id });

  if (!quiz) {
    return res
      .status(404)
      .json({ message: `Can not find quiz with id: ${_id}` });
  }

  return res.status(204);
};
