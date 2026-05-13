import {Joi, Segments} from "celebrate";
import { isValidObjectId } from "mongoose";

import { contactTypes, emailRegex } from "../constants/contactsConstants.js";

const objectIdValidator = (value, helpers)=> {
  return isValidObjectId(value) ? value : helpers.message("Invalid id format");
};

export const contactIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createContactSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required().messages({
      'any.required': "lastName must be exist",
      'string.base': 'lastName must be string'
    }),
    email: Joi.string().pattern(emailRegex).required(),
    phone: Joi.string().min(12).max(20).required(),
    type: Joi.string().valid(...contactTypes).required(),
  })
};

export const updateContactSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().pattern(emailRegex),
    phone: Joi.string().min(12).max(20),
    type: Joi.string().valid(...contactTypes),
  })
};