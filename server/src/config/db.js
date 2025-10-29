require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  timezone: "+07:00", // Timezone Việt Nam (Asia/Ho_Chi_Minh)
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`Connected to MySQL database: ${process.env.DB_NAME}`);
    conn.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
})();

module.exports = pool;