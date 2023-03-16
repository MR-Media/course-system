import { Request, Response } from "express";
import { Course, ICourse } from "../models/Course";
import { User } from "../models/User";

export const get_courses = async (req: Request, res: Response) => {
  const courses = await Course.find();

  if (!courses) {
    return res.status(500).send("Something went wron fetching the courses");
  }

  return res.json(courses);
};

export const get_courses_by_user = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const courses = await Course.find({ instructor: userId });

  if (!courses) {
    return res.status(500).send("Something went wrong fetching the courses");
  }

  return res.json(courses);
};

export const get_course_by_id = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  return res.json(course);
};

export const post_course = async (req: Request, res: Response) => {
  const { title, description, price } = req.body as ICourse;
  const { uid } = req.decodedToken;

  if (!(title && description)) {
    return res.status(400).send("Title and description are required fields!");
  }

  const course = await Course.create({
    title,
    description,
    instructor: uid,
    price,
  });

  // Add course to user's courses array
  await User.findByIdAndUpdate(uid, { $push: { courses: course._id } });

  return res.status(201).json(course);
};

export const edit_course = async (req: Request, res: Response) => {
  const { title, description, price, modules } = req.body as ICourse;
  const { courseId } = req.params;

  if (!(title || description || price || modules)) {
    return res.status(400).send("Please pass fields that need to be updated");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  course.title = title;
  course.description = description;
  course.modules = modules;
  course.price = price;

  await course.save().then((savedCourse) => {
    if (!savedCourse) {
      return res.status(500).send("Something went wrong saving the course");
    }
    res.status(200).json(savedCourse);
  });
};

export const delete_course = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const course = await Course.findOneAndDelete({ _id: courseId });

  if (!course) {
    return res
      .status(404)
      .json({ message: `Can not find course with id: ${courseId}` });
  }

  return res.status(204).send();
};
