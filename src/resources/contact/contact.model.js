import { Schema, model } from 'mongoose';

const createContactSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Contact = model('contact', createContactSchema);
