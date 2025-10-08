const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    // Get all users
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  // Find user by email
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  // Find user by id
  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  // Create new user
  create: (userData, callback) => {
    const { name, email, password, phone, role } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
      'INSERT INTO users (name, email, password, phone, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, role, new Date(), new Date()],
      callback
    );  
  },

  // Delete user
  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  },
};
module.exports = User;