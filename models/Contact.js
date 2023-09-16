import { Schema, model } from "mongoose";
import {handleSaveError} from "./hooks.js"

import Joi from "joi";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name"`,
  }),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export default Contact;
