const db = require("../config/db");

const Setting = {
  async get() {
    const [rows] = await db.query("SELECT * FROM settings WHERE id = 1 LIMIT 1");
    return rows[0] || null;
  },

  async update(data) {
    const [result] = await db.query("UPDATE settings SET ? WHERE id = 1", [data]);
    return result.affectedRows > 0;
  },
};

module.exports = Setting;