import express from "express";

import contactsController from "../../controllers/contacts-controller.js"

import contactValidation from "../../middleware/validation/contact-validation.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

// contactsRouter.get("/:id", contactsController.getById);

// contactsRouter.post("/", contactValidation.addContactValidate, contactsController.add);

// contactsRouter.put("/:id", contactValidation.addContactValidate, contactsController.updateById);

// contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
