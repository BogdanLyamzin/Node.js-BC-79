import {Schema, model} from "mongoose";

import { contactTypes, emailRegex } from "../../constants/contactsConstants.js";

import { handleSaveError, setUpdateRules } from "../hooks.js";

const contactSchema = new Schema({
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
  }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateRules);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;