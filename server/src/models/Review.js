const db = require("../config/db");

const Review = {
    async create(data) {
        const [result] = await db.query("INSERT INTO reviews SET ?", [data]);
        return result.insertId;
    },
    async getAll() {
        const [rows] = await db.query("SELECT * FROM reviews");
        return rows;
    },
    async getById(id) {
        const [rows] = await db.query("SELECT * FROM reviews WHERE id = ?", [id]);
        return rows[0];
    },
};