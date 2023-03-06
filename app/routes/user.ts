import { Router } from "express";

import { isAuthorized } from "../middleware/auth";

import {
  get_my_user,
  get_user_by_id,
  login,
  register,
} from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getMyUser", isAuthorized, get_my_user);
userRouter.get("/getUserById", isAuthorized, get_user_by_id);
