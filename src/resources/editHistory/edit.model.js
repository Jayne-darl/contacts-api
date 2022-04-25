import { Schema, model, SchemaTypes } from 'mongoose';

const createContactEditSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    contactId: { type: SchemaTypes.ObjectId, ref: 'contact', required: true },
  },
  { timestamps: true },
);

export const EditHistory = model('editHistory', createContactEditSchema);
