const db = require("../config/db");

const User = {
  async getAll() {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, role, status, created_at, updated_at FROM users"
    );
    return rows;
  },

  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, password, role, status FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  async findByPhone(phone) {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, role, status FROM users WHERE phone = ?",
      [phone]
    );
    return rows[0] || null;
  },

  async create({
    name,
    email,
    password,
    role,
    phone = null,
    status = "active",
  }) {
    const sql = `INSERT INTO users (name, email, password, role, phone, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [
      name,
      email,
      password,
      role,
      phone,
      status,
    ]);
    return { id: result.insertId, name, email, role, phone, status };
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, role, status FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async update(id, data) {
    const allowedFields = [
      "name",
      "email",
      "phone",
      "role",
      "status",
      "password",
    ];
    const fields = Object.keys(data).filter((f) => allowedFields.includes(f));

    if (fields.length === 0) {
      return await this.findById(id);
    }

    const values = fields.map((f) => data[f]);
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
    await db.query(sql, [...values, id]);
    return await this.findById(id);
  },
};

module.exports = User;