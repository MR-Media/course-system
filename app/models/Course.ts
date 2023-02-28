import { Schema, model } from "mongoose";

import { IModule, moduleSchema } from "./Module";
import { IUser } from "./User";

export interface ICourse {
  title: string;
  description: string;
  price: number;
  modules: IModule[];
  author: IUser;
  createdAt: Date;
}

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  modules: [moduleSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type CourseType = typeof courseSchema;

module.exports = model("Course", courseSchema);
