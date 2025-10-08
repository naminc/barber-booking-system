const db = require('../config/db');

const Service = {
  // Get all services
  getAll: (callback) => {
    db.query('SELECT * FROM services', callback);
  },
};
module.exports = Service;