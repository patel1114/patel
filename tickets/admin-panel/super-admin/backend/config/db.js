const mysql = require('mysql2/promise');

// Database Connection Pool
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'atul123', // Change if needed
    database: 'dummy',
    port:3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Database Connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to MySQL');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

module.exports = db;
