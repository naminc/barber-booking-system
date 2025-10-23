const Staff = require('../models/Staff');

exports.getAllStaff = async () => {
  return await Staff.getAll();
};

exports.getStaffById = async (id) => {
  return await Staff.getById(id);
};

exports.createStaff = async (data) => {
  return await Staff.create(data);
};

exports.updateStaff = async (id, data) => {
  return await Staff.update(id, data);
};

exports.deleteStaff = async (id) => {
  return await Staff.delete(id);
};

exports.getStaffStats = async () => {
  const total = await Staff.getStaffCount();
  const active = await Staff.getActiveStaffCount();
  const inactive = total - active;
  return { total, active, inactive };
};