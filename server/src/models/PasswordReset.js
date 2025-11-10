const db = require("../config/db");
const crypto = require("crypto");

const PasswordReset = {

  async createToken(userId) {
    const token = crypto.randomBytes(32).toString("hex");
    
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await db.query(
      "DELETE FROM password_resets WHERE user_id = ?",
      [userId]
    );

    await db.query(
      "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, expiresAt]
    );

    return token;
  },

  async findByToken(token) {
    const [rows] = await db.query(
      "SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()",
      [token]
    );
    return rows[0] || null;
  },

  async deleteToken(token) {
    await db.query(
      "DELETE FROM password_resets WHERE token = ?",
      [token]
    );
  },

  async deleteUserTokens(userId) {
    await db.query(
      "DELETE FROM password_resets WHERE user_id = ?",
      [userId]
    );
  },
};

module.exports = PasswordReset;

