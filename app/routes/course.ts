import { Router } from "express";

import { isAuthorized } from "../middleware/auth";

import {
  delete_course,
  edit_course,
  get_courses,
  get_courses_by_user,
  get_course_by_id,
  post_course,
} from "../controllers/courseController";

export const courseRouter = Router();

courseRouter.get("/", isAuthorized, get_courses);
courseRouter.get("/:userId", isAuthorized, get_courses_by_user);
courseRouter.get("/:courseId", isAuthorized, get_course_by_id);
courseRouter.post("/", isAuthorized, post_course);
courseRouter.put("/:courseId", isAuthorized, edit_course);
courseRouter.delete("/:courseId", isAuthorized, delete_course);
