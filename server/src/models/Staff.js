const db = require('../config/db');

const Staff = {
    // Get all staff
    getAll: (callback) => {
        db.query('SELECT * FROM staff', callback);
    },

    // Create new staff
    create: (staffData, callback) => {
        const { name, specialization, phone, status } = staffData;
        db.query(
            'INSERT INTO staff (name, specialization, phone, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [name, specialization, phone, status, new Date(), new Date()],
            callback
        );
    },
};
module.exports = Staff;