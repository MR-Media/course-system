import { Schema, model } from "mongoose";

const quizSchema = require("./quiz");

const lessonSchema = new Schema({
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

export type lessonType = typeof lessonSchema;

module.exports = model("Lesson", lessonSchema);
