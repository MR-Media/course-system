import { Request, Response } from "express";
import { IModule, Module } from "../models/Module";

export const get_modules = async (req: Request, res: Response) => {
  const modules = await Module.find();

  if (!modules) {
    return res.status(500).send("Something went wron fetching the modules");
  }

  return res.json(modules);
};

export const get_module_by_id = async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  const module = await Module.find({ _id: moduleId });

  if (!module) {
    return res.status(404).send("Module not found");
  }

  return res.json(module);
};

export const post_module = async (req: Request, res: Response) => {
  const { title, description, courseId } = req.body as IModule;

  if (!(title && description)) {
    return res.status(400).send("Title and description are required fields!");
  }

  const module = await Module.create({
    title,
    description,
    courseId,
  });

  return res.status(201).json(module);
};

export const edit_module = async (req: Request, res: Response) => {
  const { title, description, courseId, lessons } = req.body as IModule;
  const { moduleId } = req.params;

  if (!(title && description)) {
    return res.status(400).send("Title and description are required fields!");
  }

  const module = await Module.findByIdAndUpdate(
    moduleId,
    {
      title,
      description,
      courseId,
      lessons,
    },
    { new: true }
  );

  return res.status(200).json(module);
};

export const delete_module = async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  if (!moduleId) return res.status(400).send("ModuleId is required!");

  const module = await Module.findByIdAndDelete(moduleId);

  if (!module) {
    return res.status(404).send("Module not found");
  }

  return res.status(200).json(module);
};
