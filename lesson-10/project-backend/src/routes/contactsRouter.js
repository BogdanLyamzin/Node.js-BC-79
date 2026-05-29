import { Router } from 'express';
import { celebrate } from 'celebrate';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

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

// upload.fields([
//   {
//     name: "photo",
//     maxCount: 1
//   },
//   {
//     name: "avatar",
//     maxCount: 1
//   }
// ])
// upload.array("photo", 8);
contactsRouter.post('/', upload.single("photo"), celebrate(createContactSchema), addContact);

contactsRouter.patch('/:id', celebrate(updateContactSchema), updateContactById);

contactsRouter.delete('/:id', celebrate(contactIdSchema), deleteContactById);

export default contactsRouter;
