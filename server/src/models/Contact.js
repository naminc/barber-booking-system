const db = require("../config/db");

const Contact = {
    async create(data) {
        const [result] = await db.query("INSERT INTO contacts SET ?", [data]);
        return result.insertId;
    },
    async getAll() {
        const [rows] = await db.query("SELECT * FROM contacts");
        return rows;
    },
    async getById(id) {
        const [rows] = await db.query("SELECT * FROM contacts WHERE id = ?", [id]);
        return rows[0];
    },
};