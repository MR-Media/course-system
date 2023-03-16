import { Router } from "express";

import { isAuthorized } from "../middleware/auth";

import {
  get_my_user,
  get_user_by_id,
  login,
  register,
  delete_user,
  get_all_users,
} from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getMyUser", isAuthorized, get_my_user);
userRouter.get("/getUserById", isAuthorized, get_user_by_id);
userRouter.get("/getAllUsers", isAuthorized, get_all_users);
userRouter.delete("/deleteUser", isAuthorized, delete_user);
