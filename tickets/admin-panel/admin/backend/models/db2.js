const mysql = require('mysql2/promise');

// Create a connection pool
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'atul123',
    database: 'dummy',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: Check connection when the server starts
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connected to MySQL');
        connection.release(); // release connection back to pool
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
})();

module.exports = db;
