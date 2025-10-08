const db = require("../config/db");

const Appointment = {
  // Get all appointments
  getAll: (callback) => {
    db.query('SELECT * FROM appointments', callback);
  },
};
module.exports = Appointment;
