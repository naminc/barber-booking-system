const db = require("../config/db");

const Contact = {
    async create(data) {
        const [result] = await db.query("INSERT INTO contacts SET ?", [data]);
        return result.insertId;
    },
    async getAll() {
        const [rows] = await db.query("SELECT * FROM contacts ORDER BY created_at DESC");
        return rows;
    },
    async getById(id) {
        const [rows] = await db.query("SELECT * FROM contacts WHERE id = ?", [id]);
        return rows[0];
    },
    async delete(id) {
        const [result] = await db.query("DELETE FROM contacts WHERE id = ?", [id]);
        return result;
    },
    async updateStatus(id, status) {
        const [result] = await db.query("UPDATE contacts SET status = ? WHERE id = ?", [status, id]);
        return result;
    },
};

module.exports = Contact;