import { Router } from 'express';
import {celebrate} from "celebrate";

import {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../controllers/contactControllers.js';

import { contactIdSchema, createContactSchema, updateContactSchema } from '../validation/contactsValidation.js';

const contactsRouter = Router();

contactsRouter.get('/', getContacts);

contactsRouter.get('/:id', celebrate(contactIdSchema), getContactById);

contactsRouter.post('/', addContact);

contactsRouter.patch("/:id",  updateContactById);

contactsRouter.delete("/:id", celebrate(contactIdSchema), deleteContactById);

export default contactsRouter;
