import { Schema, model } from "mongoose";

export interface IQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizSchema = new Schema<IQuiz>({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

export const Quiz = model<IQuiz>("Quiz", quizSchema);
