import {Schema, model} from "mongoose";

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
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["family", "friends", "work"],
    required: true,
  }
}, {versionKey: false, timestamps: true});

const Contact = model("contact", contactSchema);
// category => categories
// mouse => mice

export default Contact;