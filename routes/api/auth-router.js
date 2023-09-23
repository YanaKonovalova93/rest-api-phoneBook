import express from "express";

import authController from "../../controllers/auth-controller.js";

import * as userSchema from "../../models/User.js";

import {validateBody} from "../../decorators/index.js";


const authRouter = express.Router();
const userRegisterValidate = validateBody(userSchema.userRegisterSchema)

authRouter.post("/register", userRegisterValidate, authController.register);
authRouter.

export default authRouter;
