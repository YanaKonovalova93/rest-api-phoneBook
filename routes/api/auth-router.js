import express from "express";

import authController from "../../controllers/auth-controller.js";

import * as userSchema from "../../models/User.js";

import { validateBody } from "../../decorators/index.js";
import { authenticate, upload  } from "../../middlewares/index.js";

const authRouter = express.Router();
const userRegisterValidate = validateBody(userSchema.userRegisterSchema);
const userLoginValidate = validateBody(userSchema.userLoginSchema);

// upload.fields([{name:"avatar", maxCount:1}])
// upload.array("avatar", 8)
authRouter.post("/register", upload.single("avatar"), userRegisterValidate, authController.register);
authRouter.post("/login", userLoginValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch("/", authenticate, authController.subscriptionUpdate);
authRouter.patch("/avatars", upload.single("avatar"), authenticate, authController.avatarUpdate);

export default authRouter;
