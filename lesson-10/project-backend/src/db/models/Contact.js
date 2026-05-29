import { Schema, model } from 'mongoose';

import { contactTypes } from '../../constants/contactsConstants.js';
import { emailRegex } from '../../constants/index.js';

import { handleSaveError, setUpdateRules } from '../hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minLength: 12,
      maxLength: 20,
    },
    type: {
      type: String,
      enum: contactTypes,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const contactSortFields = [
  'name',
  'lastName',
  'email',
  'phone',
  'type',
  'createdAt',
  'updatedAt',
];

contactSchema.index({ type: 1 });

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateRules);

contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
