const Appointment = require("../models/Appointment");

exports.getAllAppointments = async () => {
  return await Appointment.getAll();
};

exports.getAppointmentById = async (id) => {
  return await Appointment.getById(id);
};

exports.getAppointmentsByUserId = async (userId) => {
  return await Appointment.getByUserId(userId);
};

exports.getAppointmentsByStatus = async (status) => {
  return await Appointment.getByStatus(status);
};

exports.getAppointmentsByStaffId = async (staffId) => {
  return await Appointment.getByStaffId(staffId);
};

exports.getAppointmentsByDateRange = async (startDate, endDate) => {
  return await Appointment.getByDateRange(startDate, endDate);
};

exports.createAppointment = async (data) => {
  return await Appointment.create(data);
};

exports.updateAppointment = async (id, data) => {
  return await Appointment.update(id, data);
};

exports.updateAppointmentStatus = async (id, status) => {
  return await Appointment.updateStatus(id, status);
};

exports.deleteAppointment = async (id) => {
  return await Appointment.delete(id);
};

exports.getAppointmentCount = async () => {
  return await Appointment.getAppointmentCount();
};

exports.checkTimeConflict = async (
  staffId,
  appointmentDate,
  serviceId,
  excludeId = null
) => {
  return await Appointment.checkTimeConflict(
    staffId,
    appointmentDate,
    serviceId,
    excludeId
  );
};
