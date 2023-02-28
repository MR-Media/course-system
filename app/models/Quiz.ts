import { Schema, model } from "mongoose";

interface IQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizSchema = new Schema<IQuiz>({
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

const Quiz = model<IQuiz>("Quiz", quizSchema);

export default Quiz;
