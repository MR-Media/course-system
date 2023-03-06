import { Schema, model } from "mongoose";

import { IModule, moduleSchema } from "./Module";
import { IUser } from "./User";

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  modules: IModule[];
  instructor: IUser;
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
    default: 0,
    min: 0,
  },
  modules: [moduleSchema],
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = model<ICourse>("Course", courseSchema);
