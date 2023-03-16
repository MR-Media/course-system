import { Schema, model } from "mongoose";
import { IModule } from "./Module";

export interface ILesson {
  title: string;
  content: string;
  moduleId: IModule;
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
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
});

export const Lesson = model<ILesson>("Lesson", lessonSchema);
