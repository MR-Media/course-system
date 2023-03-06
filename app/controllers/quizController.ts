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
  if (options.length < correctAnswer) {
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

export const edit_quiz = async (req: Request, res: Response) => {
  const { question, options, correctAnswer } = req.body as IQuiz;
  const { quizId } = req.params;

  if (!(question || options || correctAnswer)) {
    return res.status(400).send("Please pass fields that need to be updated");
  }

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(404).send("Course not found");
  }

  quiz.question = question;
  quiz.options = options;
  quiz.correctAnswer = correctAnswer;

  await quiz.save().then((savedQuiz) => {
    if (!savedQuiz) {
      return res.status(500).send("Something went wrong saving the course");
    }
    res.status(200).json(savedQuiz);
  });
};

export const delete_quiz = async (req: Request, res: Response) => {
  const { quizId } = req.params;
  const quiz = await Quiz.findOneAndDelete({ _id: quizId });

  if (!quiz) {
    return res
      .status(404)
      .json({ message: `Can not find quiz with id: ${quizId}` });
  }

  return res.status(204).send();
};
