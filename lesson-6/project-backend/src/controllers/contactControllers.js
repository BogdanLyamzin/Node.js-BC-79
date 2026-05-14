import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortOrder = 'asc',
    sortBy = '_id',
    type,
    search,
  } = req.query;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find();
  if (type) {
    contactsQuery.where('type').equals(type);
  }
  if (search) {
    contactsQuery.where({
      $or: [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          lastName: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }

  const [totalItems, contacts] = await Promise.all([
    contactsQuery.clone().countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    contacts,
    totalItems,
    totalPages,
    page,
    perPage,
  });
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  // const contact = await Contact.findOne({_id: id});
  if (!contact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json(contact);
};

export const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

export const updateContactById = async (req, res) => {
  const { id: _id } = req.params;
  const updateContact = await Contact.findOneAndUpdate({ _id }, req.body);
  if (!updateContact) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }
  res.json(updateContact);
};

export const deleteContactById = async (req, res) => {
  const { id: _id } = req.params;
  const deleteContact = await Contact.findOneAndDelete({ _id });
  if (!deleteContact) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }
  // const deleteContact = await Contact.findByIdAndDelete(_id);
  // res.status(204).send();

  res.json({
    message: 'Delete successfully',
  });
};
