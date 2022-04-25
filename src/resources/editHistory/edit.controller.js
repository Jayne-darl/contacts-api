import { EditHistory } from './edit.model';

export class ContactEditController {
  static async createContactEdit(req) {
    try {
      const contactEdit = new EditHistory(req);
      return contactEdit.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getContactEditHistory(req) {
    try {
      const contactEditHistory = await EditHistory.find({ contactId: req.contactId });
      return contactEditHistory;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteContactEditHistory(req) {
    try {
      return EditHistory.deleteMany({ contactId: req.contactId });
    } catch (error) {
      throw new Error(error);
    }
  }
}
