import { Router } from 'express';
import { ROUTES } from './routes';
import { ContactController } from './contact.controller';
import { checkIfNumberAlreadyExist, checkIfUserAlreadyExist, validateCreateContactFormdata } from './contact.middleware';

const { CONTACT, SINGLE_CONTACT } = ROUTES;
const {
  createContact, getAllContacts, getAContact, editContact, deleteContact,
} = ContactController;
const contactRouter = Router();

contactRouter.post(CONTACT, validateCreateContactFormdata, checkIfNumberAlreadyExist, checkIfUserAlreadyExist, createContact);
contactRouter.get(CONTACT, getAllContacts);
contactRouter.get(SINGLE_CONTACT, getAContact);
contactRouter.patch(SINGLE_CONTACT, checkIfNumberAlreadyExist, checkIfUserAlreadyExist, editContact);
contactRouter.delete(SINGLE_CONTACT, deleteContact);

export default contactRouter;
