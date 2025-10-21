const db = require("../config/db");

const User = {
  async getAll() {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, role, created_at, updated_at FROM users"
    );
    return rows;
  },

  async findByEmail(email) {
    const [rows] = await db.query("SELECT id, name, email, phone, password, role FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0] || null;
  },

  async create({ name, email, password, role }) {
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [name, email, password, role]);
    return { id: result.insertId, name, email, role };
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT id, name, email, phone, role FROM users WHERE id = ?", [id]);
    return rows[0];
  },
};

module.exports = User;