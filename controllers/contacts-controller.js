import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "This contact not found");
  }
  res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found ");
  }

  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact not found`);
  }

  res.status(404).json({
    message: "Delete success",
  });
};

export default {
  deleteById: ctrlWrapper(deleteById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  getById: ctrlWrapper(getById),
  getAll: ctrlWrapper(getAll),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
