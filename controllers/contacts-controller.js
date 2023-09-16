

// import contactsService from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";

import {ctrlWrapper} from "../decorators/index.js"

import Contact from "../models/Contact.js"


const getAll = async (req, res) => {
      const result = await Contact.find();
      res.status(200).json(result);
  };


// const getById = async (req, res) => {
//       const { id } = req.params;
//       const result = await contactsService.getContactById(id);
//       if (!result) {
//         throw HttpError(404, "This contact not found");
//       }
//       res.status(200).json(result);
//   };
  
  
// const updateById = async (req, res) => {
//       const { id } = req.params;
//       const result = await contactsService.updateContact(id, req.body);
//       if (!result) {
//         throw HttpError(404);
//       }
//       res.json(result);
    
//   };
  
// const add =  async (req, res) => {
//       const result = await contactsService.addContact(req.body);
//       res.status(201).json(result);
//   };
  
  
// const deleteById = async (req, res) => {
//       const { id } = req.params;
//       const result = await contactsService.removeContact(id);
//       if (!result) {
//         throw HttpError(404, `Contact not found`);
//       }
  
//       res.status(404).json({
//         message: "Not found",
//       });
//   };  


  export default {
    // deleteById: ctrlWrapper(deleteById),
    // add: ctrlWrapper(add),
    // updateById: ctrlWrapper(updateById),
    // getById: ctrlWrapper(getById),
    getAll: ctrlWrapper(getAll),
  }