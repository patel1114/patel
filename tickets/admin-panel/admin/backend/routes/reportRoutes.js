const express = require('express')
const db = require('../models/db2')
const router = express.Router()
const { getAssignedTickets } = require('../controllers/ticketController');
//Moiddleware to check if admin is logged in\

function requireAdminAuth(req,res,next){
    if(!req.session.admin){
        return res.redirect('/admin/login')
    }
    next()
}

//reports page 
router.get('/reports',requireAdminAuth,async(req,res)=>{
    try{
        console.log("=== Reports Route ===");
        console.log("Session data:", req.session);
        console.log("Admin data:", req.session.admin);

        const adminId = req.session.admin.id;
        const adminEmail = req.session.admin.email;
        console.log("Admin ID:", adminId);
        console.log("Admin Email:", adminEmail);

        // Fetch assigned tickets
        const tickets = await getAssignedTickets(adminEmail);
        console.log("Fetched tickets:", tickets);
        
        // Fetch ticket counts by help topic for assigned tickets
        const [ticketByHelpTopic] = await db.query(
            `SELECT helpTopic, COUNT(*) AS count 
             FROM tickets t
             LEFT JOIN ticket_assignments ta ON t.id = ta.ticket_id
             WHERE ta.admin_id = ? OR t.assigned_admin_id = ?
             GROUP BY helpTopic`, 
            [adminId, adminId]
        );
        console.log("Tickets by help topic:", ticketByHelpTopic);
        
        // Fetch ticket counts by location for assigned tickets
        const [ticketByLocation] = await db.query(
            `SELECT location, COUNT(*) AS count 
             FROM tickets t
             LEFT JOIN ticket_assignments ta ON t.id = ta.ticket_id
             WHERE ta.admin_id = ? OR t.assigned_admin_id = ?
             GROUP BY location`, 
            [adminId, adminId]
        );
        console.log("Tickets by location:", ticketByLocation);
        
        // Fetch ticket counts by type for assigned tickets
        const [ticketByType] = await db.query(
            `SELECT type, COUNT(*) AS count 
             FROM tickets t
             LEFT JOIN ticket_assignments ta ON t.id = ta.ticket_id
             WHERE ta.admin_id = ? OR t.assigned_admin_id = ?
             GROUP BY type`, 
            [adminId, adminId]
        );
        console.log("Tickets by type:", ticketByType);
        
        // Fetch all tickets assigned to this admin, ordered by latest
        const [allTickets] = await db.query(
            `SELECT DISTINCT t.* 
             FROM tickets t
             LEFT JOIN ticket_assignments ta ON t.id = ta.ticket_id
             WHERE ta.admin_id = ? OR t.assigned_admin_id = ?
             ORDER BY t.id DESC`, 
            [adminId, adminId]
        );
        console.log("All tickets:", allTickets);

        res.render('reports',{
            ticketByHelpTopic : ticketByHelpTopic,
            ticketByLocation : ticketByLocation,
            ticketByType : ticketByType,
            allTickets : allTickets,
            tickets: tickets
        })
    }
    catch(error){
        console.error("Error in reports route:", error);
        res.status(500).render('error', { 
            message: 'Error fetching reports data',
            error: error.message 
        });
    }
})

module.exports=router