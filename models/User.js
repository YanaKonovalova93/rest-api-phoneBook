import { Schema, model } from "mongoose";
import { handleSaveError, runValidateUpdate } from "./hooks.js";

import Joi from "joi";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema( 
  { 
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    token: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true },
  
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidateUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export const userRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
})

// export const userSigninSchema = Joi.object({
//     email: Joi.string().pattern(emailRegex).required(),
//     password: Joi.string().min(6).required(),
// })

export default User;
