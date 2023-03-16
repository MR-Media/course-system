import { Request, Response } from "express";

import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).send("All fields are required!");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already in use");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = jwt.sign(
    {
      uid: user._id,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "2h",
    }
  );

  const userWithToken = {
    ...user.toObject(),
    password: undefined,
    token,
  };

  return res.status(201).json(userWithToken);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All fields are required!");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send("No user found with this email!");
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        uid: user._id,
      },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({ token });
  } else {
    res.status(400).send("Passwords do not match");
  }
};

export const get_my_user = async (req: Request, res: Response) => {
  const user = await User.findById(req.decodedToken.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.send(user);
};

export const get_user_by_id = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const user = await User.findById(user_id);

  return res.send(user);
};

export const get_all_users = async (req: Request, res: Response) => {
  const users = await User.find();

  if (!users) {
    return res.status(500).send("Something went wrong fetching the users");
  }

  return res.send(users);
};

export const delete_user = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).send("User id is required!");

  const user = await User.findByIdAndDelete(user_id);

  if (!user) return res.status(404).send("User not found!");

  return res.status(200).send("User deleted!");
};
