import { Request, Response } from "express";
import { ILesson, Lesson } from "../models/Lesson";
import { Module } from "../models/Module";

export const get_lessons = async (req: Request, res: Response) => {
  const lessons = await Lesson.find();

  if (!lessons) {
    return res.status(500).send("Something went wrong fetching the lessons");
  }

  return res.json(lessons);
};

export const get_lesson_by_id = async (req: Request, res: Response) => {
  const { lessonId } = req.params;

  const lesson = Lesson.find({ _id: lessonId });

  if (!lesson) {
    return res.status(404).send("Lesson not found");
  }

  return res.json(lesson);
};

export const post_lesson = async (req: Request, res: Response) => {
  const { title, content, moduleId } = req.body as ILesson;

  if (!(title && content)) {
    return res.status(400).send("Title and content are required fields!");
  }

  const lesson = await Lesson.create({
    title,
    content,
    moduleId,
  });

  // Add lesson to the module's lessons array
  await Module.findByIdAndUpdate(moduleId, { $push: { lessons: lesson._id } });

  return res.status(201).json(lesson);
};

export const edit_lesson = async (req: Request, res: Response) => {
  const { title, content, moduleId } = req.body as ILesson;
  const { lessonId } = req.params;

  if (!(title && content)) {
    return res.status(400).send("Title and content are required fields!");
  }

  const lesson = await Lesson.findByIdAndUpdate(
    lessonId,
    {
      title,
      content,
      moduleId,
    },
    { new: true }
  );

  return res.status(201).json(lesson);
};

export const delete_lesson = async (req: Request, res: Response) => {
  const { lessonId } = req.params;

  if (!lessonId) return res.status(400).send("LessonId is required!");

  const lesson = await Lesson.findByIdAndDelete(lessonId);

  if (!lesson) {
    return res.status(404).send("Lesson not found");
  }

  return res.status(200).send("Lesson deleted");
};
