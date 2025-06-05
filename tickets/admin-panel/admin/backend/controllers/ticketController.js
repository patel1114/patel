const db = require('../models/db2')

//Fetch all tickets
const getAssignedTickets = async (adminEmail) => {
    try {
        console.log('Getting all tickets');

        // Get all tickets from the database
        const [tickets] = await db.query(`
            SELECT t.*, ta.assigned_at, a.username as assigned_admin_name
            FROM tickets t 
            LEFT JOIN ticket_assignments ta ON t.id = ta.ticket_id 
            LEFT JOIN admins a ON t.assigned_admin_id = a.id
            ORDER BY t.createdAt DESC
        `);
        
        console.log(`Found ${tickets.length} total tickets`);
        return tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};

// Assign admin based on location
const assignAdmin = async (location) => {
    try {
        console.log("Finding admin for location:", location);
        // Get available admin for the location
        const [admins] = await db.query(
            'SELECT * FROM admins WHERE location = ? AND status = "active" LIMIT 1',
            [location]
        );

        if (admins.length === 0) {
            console.log(`No admin found for location: ${location}`);
            return null;
        }

        console.log("Found admin:", admins[0]);
        return admins[0];
    } catch (error) {
        console.error("Error finding admin:", error);
        return null;
    }
};


module.exports = {getAssignedTickets,assignAdmin}