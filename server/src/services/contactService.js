const Contact = require('../models/Contact');

exports.getAllContacts = async () => {
  return await Contact.getAll();
};

exports.getContactById = async (id) => {
  return await Contact.getById(id);
};

exports.createContact = async (data) => {
  return await Contact.create(data);
};

exports.deleteContact = async (id) => {
  return await Contact.delete(id);
};

exports.updateContactStatus = async (id, status) => {
  return await Contact.updateStatus(id, status);
};

