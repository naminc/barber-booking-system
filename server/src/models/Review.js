const db = require("../config/db");

const Review = {
  async create(data) {
    const [result] = await db.query("INSERT INTO reviews SET ?", [data]);
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query(`
      SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        st.name as staff_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN services s ON r.service_id = s.id
      LEFT JOIN staff st ON r.staff_id = st.id
      ORDER BY r.created_at DESC
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      `
      SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        st.name as staff_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN services s ON r.service_id = s.id
      LEFT JOIN staff st ON r.staff_id = st.id
      WHERE r.id = ?
    `,
      [id]
    );
    return rows[0];
  },

  async update(id, data) {
    await db.query("UPDATE reviews SET ?, updated_at = NOW() WHERE id = ?", [
      data,
      id,
    ]);
    return await this.getById(id);
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async updateStatus(id, status) {
    await db.query(
      "UPDATE reviews SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, id]
    );
    return await this.getById(id);
  },

  async getByService(serviceId) {
    const [rows] = await db.query(
      `
      SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        st.name as staff_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN services s ON r.service_id = s.id
      LEFT JOIN staff st ON r.staff_id = st.id
      WHERE r.service_id = ?
      ORDER BY r.created_at DESC
    `,
      [serviceId]
    );
    return rows;
  },

  async getByStaff(staffId) {
    const [rows] = await db.query(
      `
      SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        st.name as staff_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN services s ON r.service_id = s.id
      LEFT JOIN staff st ON r.staff_id = st.id
      WHERE r.staff_id = ?
      ORDER BY r.created_at DESC
    `,
      [staffId]
    );
    return rows;
  },

  async getByUser(userId) {
    const [rows] = await db.query(
      `
      SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        st.name as staff_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN services s ON r.service_id = s.id
      LEFT JOIN staff st ON r.staff_id = st.id
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC
    `,
      [userId]
    );
    return rows;
  },
};

module.exports = Review;
