import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import * as contactSchema from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";

import { isValidId } from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactSchema.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactSchema.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", contactAddValidate, contactsController.add);

contactsRouter.put(
  "/:id",
  isValidId,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
