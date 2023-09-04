import express from "express";
import contactsService from "../../models/contacts.js";

import {HttpError} from "../../helpers/index.js"

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

contactsRouter.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
     const result = await contactsService.getContactById(id);
  if(!result) {
    throw HttpError(404, 'This contact not found');


    // const error = new Error('This contact not found');
    // error.status = 404;
    // throw error;
    // return res.status(404).json({
    //   message: 'This contact not found',
    // });
  }
     res.json(result);
  } catch (error) {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
      message,
    });
  }
 
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await contactsService.addContact({
    name,
    email,
    phone,
  });
  res.json(result);
});

contactsRouter.delete("/:id", async (req, res, next) => {
  const result = await contactsService.removeContact(id);
  res.json(result);
});

contactsRouter.put("/:id", async (req, res, next) => {
  const result = await contactsService.updateContact(id, {
    name,
    email,
    phone,
  });
  res.json(result);
});

export default contactsRouter;
