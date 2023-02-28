import { Schema, model } from "mongoose";
import { ILesson, lessonSchema } from "./Lesson";

export interface IModule {
  title: string;
  description: string;
  lessons: ILesson[];
}

export const moduleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema],
});

export const Module = model<IModule>("Module", moduleSchema);
