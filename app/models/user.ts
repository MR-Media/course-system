import { Schema, model } from "mongoose";

import { ICourse } from "./Course";

export interface IUser {
  username: string;
  email: string;
  password: string;
  courses: ICourse;
  createdAt: Date;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
