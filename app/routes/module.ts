import { Router } from "express";
import {
  get_modules,
  get_module_by_id,
  post_module,
  edit_module,
  delete_module,
} from "../controllers/moduleController";
import { isAuthorized } from "../middleware/auth";

export const moduleRouter = Router();

moduleRouter.get("/", isAuthorized, get_modules);
moduleRouter.get("/:moduleId", isAuthorized, get_module_by_id);
moduleRouter.post("/", isAuthorized, post_module);
moduleRouter.put("/:moduleId", isAuthorized, edit_module);
moduleRouter.delete("/:moduleId", isAuthorized, delete_module);
