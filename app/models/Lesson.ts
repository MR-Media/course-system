import { Schema, model } from "mongoose";

import { IQuiz, quizSchema } from "./Quiz";

export interface ILesson {
  title: string;
  content: string;
  quizzes: IQuiz[];
}

export const lessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  quizzes: [quizSchema],
});

export const Lesson = model<ILesson>("Lesson", lessonSchema);
