import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `missing required "name"`,
    }),
    email: Joi.string().required().messages({
      "any.required": `missing required "email"`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `missing required "phone"`,
    }),
  });

  export default {
    contactAddSchema,
  }