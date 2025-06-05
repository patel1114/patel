// db.js
const mysql = require("mysql2/promise");

// Create a connection pool to MySQL database
const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",  // Default to localhost or from environment
  user: process.env.DB_USER || "root",       // Default to root user or from environment
  password: process.env.DB_PASSWORD || "atul123",  // Default password or from environment
  database: process.env.DB_NAME || "dummy",   // Default database or from environment
  port: process.env.DB_PORT || 3307,          // Default MySQL port (3307 in XAMPP)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection to MySQL
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL");
    connection.release();
  } catch (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
  }
})();

// Export the database pool to be used in other files
module.exports = db;
