import { Router } from 'express';
import { celebrate } from 'celebrate';

import authenticate from '../middlewares/authenticate.js';

import {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../controllers/contactControllers.js';

import {
  getContactsSchema,
  contactIdSchema,
  createContactSchema,
  updateContactSchema,
} from '../validation/contactsValidation.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', celebrate(getContactsSchema), getContacts);

contactsRouter.get('/:id', celebrate(contactIdSchema), getContactById);

contactsRouter.post('/', celebrate(createContactSchema), addContact);

contactsRouter.patch('/:id', celebrate(updateContactSchema), updateContactById);

contactsRouter.delete('/:id', celebrate(contactIdSchema), deleteContactById);

export default contactsRouter;
