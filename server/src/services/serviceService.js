const Service = require('../models/Service');

exports.getAllService = async () => {
  return await Service.getAll();
};
exports.getServiceById = async (id) => {
  return await Service.getById(id);
};
exports.createService = async (data) => {
  return await Service.create(data);
};
exports.updateService = async (id, data) => {
  return await Service.update(id, data);
};
exports.deleteService = async (id) => {
  return await Service.delete(id);
};