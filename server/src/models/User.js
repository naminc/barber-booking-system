const db = require('../config/db');

const User = {
  async getAll() {
    const [rows] = await db.query('SELECT id, name, email, phone, role, created_at, updated_at FROM users');
    return rows;
  },

  async create({ name, email, password, phone, role }) {
    const sql = `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [name, email, password, phone, role]);
    return { id: result.insertId, name, email, phone, role };
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
  },

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
};

module.exports = User;