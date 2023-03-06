import { Request, Response } from "express";

import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User";

const register = async (req: Request, res: Response) => {
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

const login = async (req: Request, res: Response) => {
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

const get_my_user = async (req: Request, res: Response) => {
  const user = await User.findById(req.decodedToken.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.send(user);
};

const get_user_by_id = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const user = await User.findById(user_id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.send(user);
};

export { register, login, get_my_user, get_user_by_id };
