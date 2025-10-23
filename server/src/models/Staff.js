const db = require("../config/db");

const Staff = {
  async getAll() {
    const sql = "SELECT id, name, specialization, phone, experience, image, status, created_at, updated_at FROM staff";
    const [rows] = await db.query(sql);
    return rows;
  },

  async getById(id) {
    const sql = "SELECT id, name, specialization, phone, experience, image, status, created_at, updated_at FROM staff WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  async create({ name, specialization, phone, experience, image, status }) {
    const sql = `INSERT INTO staff (name, specialization, phone, experience, image, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [name, specialization, phone, experience, image || null, status || 'active']);
    return { id: result.insertId, name, specialization, phone, experience, image, status };
  },

  async update(id, { name, specialization, phone, experience, image, status }) {
    const sql = `UPDATE staff SET name = ?, specialization = ?, phone = ?, experience = ?, image = ?, status = ? WHERE id = ?`;
    const [result] = await db.query(sql, [name, specialization, phone, experience, image, status, id]);
    return result;
  },

  async delete(id) {
    const sql = "DELETE FROM staff WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result;
  },

  async getStaffCount() {
    const sql = "SELECT COUNT(*) as total FROM staff";
    const [rows] = await db.query(sql);
    return rows[0].total;
  },

  async getActiveStaffCount() {
    const sql = "SELECT COUNT(*) as total FROM staff WHERE status = 'active'";
    const [rows] = await db.query(sql);
    return rows[0].total;
  },
};

module.exports = Staff;