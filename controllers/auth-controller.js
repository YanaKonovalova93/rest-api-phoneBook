import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper, changeSize } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: "250" });

  const newUser = await User.create({
    ...req.body,
    avatar: avatarURL,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      password: newUser.password,
      email: newUser.email,
      avatar: newUser.avatar,
    },
  });
};
const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  await changeSize(newPath, 250, 250);

  const avatar = path.join("avatars", filename);

  const newAvatar = { ...req.body, avatar };
  const result = await User.findByIdAndUpdate(_id, newAvatar, { new: true });
  res.json(result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      password: user.password,
      email: user.email,
    },
  });
};

const getCurrent = (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    subscription,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "No Content",
  });
};

const subscriptionUpdate = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.json(result);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  avatarUpdate: ctrlWrapper(avatarUpdate),
};
