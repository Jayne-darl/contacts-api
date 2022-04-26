import { createContactSchema } from './contact.validation';
import { requestResponse } from '../../utils/api.response';
import { Contact } from './contact.model';

export const validateCreateContactFormdata = async (req, response, next) => {
  try {
    const value = await createContactSchema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (error) {
    return requestResponse({ response, statusCode: 422, message: error.details[0].message });
  }
};

export const checkIfUserAlreadyExist = async (req, response, next) => {
  try {
    const contact = await Contact.findOne({ email: req.body.email });
    if (contact) {
      return requestResponse({
        response, statusCode: 400, message: 'Contact with email already exist',
      });
    }
    return next();
  } catch (error) {
    return requestResponse({ response });
  }
};

export const checkIfNumberAlreadyExist = async (req, response, next) => {
  try {
    const contact = await Contact.findOne({ phoneNumber: req.body.phoneNumber });
    if (contact) {
      return requestResponse({
        response, statusCode: 400, message: 'Contact already exist',
      });
    }
    return next();
  } catch (error) {
    return requestResponse({ response });
  }
};
