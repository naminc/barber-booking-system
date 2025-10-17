const db = require("../config/db");

const Service = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM services");
    return rows;
  },
  async getById(id) {
    const [rows] = await db.query("SELECT * FROM services WHERE id = ?", [id]);
    return rows[0];
  },
  async create(data) {
    const [result] = await db.query("INSERT INTO services SET ?", [data]);
    return { id: result.insertId, ...data };
  },
  async update(id, data) {
    const [result] = await db.query("UPDATE services SET ? WHERE id = ?", [
      data,
      id,
    ]);
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query("DELETE FROM services WHERE id = ?", [id]);
    return result.affectedRows;
  },
};
module.exports = Service;