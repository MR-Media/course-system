import { Schema, model } from "mongoose";
import { ICourse } from "./Course";
import { ILesson, lessonSchema } from "./Lesson";

export interface IModule {
  title: string;
  description: string;
  courseId: ICourse;
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
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessons: [lessonSchema],
});

export const Module = model<IModule>("Module", moduleSchema);
