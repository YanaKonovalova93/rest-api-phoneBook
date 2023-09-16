import express from "express";

import contactsController from "../../controllers/contacts-controller.js"

import * as contactSchema from "../../models/Contact.js"
import {validateBody} from "../../decorators/index.js"

const contactAddValidate = validateBody(contactSchema.contactAddSchema)

const contactsRouter = express.Router();


contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post("/", contactAddValidate, contactsController.add);

// contactsRouter.put("/:id", contactAddValidate, contactsController.updateById);

// contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
