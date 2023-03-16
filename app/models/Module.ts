import { Schema, model } from "mongoose";
import { ICourse } from "./Course";
import { ILesson, lessonSchema } from "./Lesson";

export interface IModule {
  title: string;
  description: string;
  course: ICourse;
  lessons?: ILesson[];
}

export const moduleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lessons: [lessonSchema],
});

export const Module = model<IModule>("Module", moduleSchema);
