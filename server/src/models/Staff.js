const db = require("../config/db");

const Staff = {
  async getAll() {
    const sql = "SELECT id, name, specialization, phone, status, created_at FROM staff";
    const [rows] = await db.query(sql);
    return rows;
  },

  async create({ name, specialization, phone, status }) {
    const sql = `INSERT INTO staff (name, specialization, phone, status) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [name, specialization, phone, status]);
    return { id: result.insertId, name, specialization, phone, status};
  },

  async delete(id) {
    const sql = "DELETE FROM staff WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result;
  },
};

module.exports = Staff;