import {validateBody } from "../../decorators/index.js"
import contactSchemas from "../../schemas/contact-schemas.js"

const addContactValidate = validateBody(contactSchemas.contactAddSchema);

export default {
    addContactValidate,
}