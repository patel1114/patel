const bcrypt = require('bcrypt');
const db = require('./models/db'); // Adjust path as needed

const username = 'admin3';
const email = 'admin3@example.com';
const plainPassword = 'shrey008';

(async () => {
    try {
        const hash = await bcrypt.hash(plainPassword, 10);

        const sql = 'INSERT INTO admins (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
        const values = [username, email, hash, 'admin'];

        const [result] = await db.query(sql, values);
        console.log('✅ Admin inserted successfully!');
    } catch (error) {
        console.error('❌ Error inserting admin:', error.message);
    } finally {
        process.exit();
    }
})();
