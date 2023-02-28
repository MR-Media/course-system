import { Schema, model } from "mongoose";

const quizSchema = new Schema({
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

export type quizType = typeof quizSchema;

module.exports = model("quiz", quizSchema);
