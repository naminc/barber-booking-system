const Staff = require('../models/Staff');

exports.getAllStaff = async () => {
  return await Staff.getAll();
};

exports.createStaff = async (data) => {
  return await Staff.create(data);
};

exports.deleteStaff = async (id) => {
  return await Staff.delete(id);
};