const express = require('express');
const db = require('../models/db2');
const router = express.Router();

// Middleware to check if admin is logged in
function requireAdminAuth(req, res, next) {
    if (!req.session.admin) {
        return res.redirect('/admin/login');
    }
    next();
}

router.get('/dashboard', requireAdminAuth, async (req, res) => {
    try {
        console.log('=== Dashboard Route ===');
        console.log('Session data:', req.session);
        
        const adminId = req.session.admin.id;
        console.log('Admin ID:', adminId);

        // Get all tickets in the system
        const [tickets] = await db.query(`
            SELECT t.*, ta.assigned_at, a.username as assigned_admin_name
            FROM tickets t 
            LEFT JOIN ticket_assignments ta ON t.id = ta.ticket_id 
            LEFT JOIN admins a ON t.assigned_admin_id = a.id
            ORDER BY t.createdAt DESC
        `);
        console.log(`Found ${tickets.length} total tickets`);

        // Get total ticket count
        const [totalTickets] = await db.query(
            `SELECT COUNT(*) AS count FROM tickets`
        );

        // Get open tickets count
        const [openTickets] = await db.query(
            `SELECT COUNT(*) AS count 
             FROM tickets 
             WHERE status = 'Open'`
        );

        // Get in-progress tickets count
        const [inProgressTickets] = await db.query(
            `SELECT COUNT(*) AS count 
             FROM tickets 
             WHERE status = 'In Progress'`
        );

        // Get closed tickets count
        const [closedTickets] = await db.query(
            `SELECT COUNT(*) AS count 
             FROM tickets 
             WHERE status = 'Closed'`
        );

        // Get tickets by location
        const [ticketsByLocation] = await db.query(
            `SELECT location, COUNT(*) as count 
             FROM tickets 
             GROUP BY location`
        );

        // Get tickets by help topic
        const [ticketsByHelpTopic] = await db.query(
            `SELECT helpTopic, COUNT(*) as count 
             FROM tickets 
             GROUP BY helpTopic`
        );

        console.log('Dashboard data:', {
            totalTickets: totalTickets[0].count,
            openTickets: openTickets[0].count,
            inProgressTickets: inProgressTickets[0].count,
            closedTickets: closedTickets[0].count,
            ticketsCount: tickets.length,
            ticketsByLocation,
            ticketsByHelpTopic
        });

        res.render('dashboard', {
            totalTickets: totalTickets[0].count,
            openTickets: openTickets[0].count,
            inProgressTickets: inProgressTickets[0].count,
            closedTickets: closedTickets[0].count,
            tickets: tickets,
            ticketsByLocation,
            ticketsByHelpTopic
        });
    } catch (error) {
        console.error('Error in dashboard route:', error);
        res.status(500).render('error', { 
            message: 'Error fetching dashboard data',
            error: error.message 
        });
    }
});

module.exports = router;
