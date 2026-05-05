import {Router} from "express";

import { getContacts, getContactById } from "../controllers/contactControllers.js";

const contactsRouter = Router();

contactsRouter.get('/', getContacts);

contactsRouter.get('/:id', getContactById);

export default contactsRouter;