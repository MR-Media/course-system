import { Schema, model } from "mongoose";

const lessonSchema = require("./lesson");

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema],
});

export type moduleType = typeof moduleSchema;

module.exports = model("Module", moduleSchema);
