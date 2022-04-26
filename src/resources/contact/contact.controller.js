import mongoose from 'mongoose';
import { requestResponse } from '../../utils/api.response';
import { Contact } from './contact.model';
import { ContactEditController } from '../editHistory/edit.controller';

const { createContactEdit, getContactEditHistory, deleteContactEditHistory } = ContactEditController;
const db = mongoose.connection;

export class ContactController {
  static async createContact(req, response) {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      return requestResponse({
        response, statusCode: 201, message: 'Contact Created', data: contact,
      });
    } catch (error) {
      return requestResponse({ response });
    }
  }

  static async editContact(req, response) {
    let session;
    try {
      const contactDoc = await Contact.findOne({ _id: req.params.id });
      if (!contactDoc) {
        return requestResponse({ response, statusCode: 404, message: 'Contact doesn\'t exist' });
      }
      session = await db.startSession();
      session.startTransaction();

      const updatedContact = await Contact.findOneAndUpdate(
        { _id: req.params.id },
        req.body,

        { new: true },
      );
      const request = {
        contactId: contactDoc._id, firstName: contactDoc.firstName, lastName: contactDoc.lastName, email: contactDoc.email, phoneNumber: contactDoc.phoneNumber,
      };
      await createContactEdit(request);

      await session.commitTransaction();
      session.endSession();

      return requestResponse({
        response, statusCode: 200, message: 'Contact updated', data: updatedContact,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return requestResponse({ response });
    }
  }

  static async getAllContacts(req, response) {
    try {
      const contacts = await Contact.find({});

      return requestResponse({
        response,
        statusCode: 200,
        message: 'Success',
        data: contacts,
      });
    } catch (error) {
      return requestResponse({ response });
    }
  }

  static async getAContact(req, response) {
    try {
      const contact = await Contact.findOne({ _id: req.params.id });
      if (!contact) {
        return requestResponse({
          response, statusCode: 404, message: 'No contact found',
        });
      }
      const contactEditHistory = await getContactEditHistory({ contactId: req.params.id });

      const data = {};
      data.contact = contact;
      data.editHistory = contactEditHistory;

      return requestResponse({
        response, statusCode: 200, message: 'Success', data,
      });
    } catch (error) {
      return requestResponse({ response });
    }
  }

  static async deleteContact(req, response) {
    const session = await db.startSession();
    session.startTransaction();
    try {
      const contact = await Contact.findOneAndRemove({ _id: req.params.id });
      if (!contact) {
        return requestResponse({
          response, statusCode: 404, message: 'No contact found',
        });
      }
      await deleteContactEditHistory({ contactId: req.params.id });

      await session.commitTransaction();
      session.endSession();

      return requestResponse({
        response,
        statusCode: 200,
        message: 'Contact Removed',
        data: contact,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return requestResponse({ response });
    }
  }
}
