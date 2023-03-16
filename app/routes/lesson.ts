import { Router } from "express";
import {
  delete_lesson,
  edit_lesson,
  get_lessons,
  get_lesson_by_id,
  post_lesson,
} from "../controllers/lessonController";

export const lessonRouter = Router();

lessonRouter.get("/", get_lessons);
lessonRouter.get("/:lessonId", get_lesson_by_id);
lessonRouter.post("/", post_lesson);
lessonRouter.put("/:lessonId", edit_lesson);
lessonRouter.delete("/:lessonId", delete_lesson);
