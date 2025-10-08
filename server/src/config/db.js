// ================================
// Database Configuration
// ================================

require('dotenv').config();
const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // stop server if DB fails
  } else {
    console.log(`Connected to MySQL database: ${process.env.DB_NAME}`);
  }
});

module.exports = db;