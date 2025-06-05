const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const path = require('path');
const { verifyCaptcha } = require("../utils/captcha");
const multer = require("multer");

// Create multer instance here instead of requiring external file
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 2 * 1024 * 1000 } // 2MB limit
});

router.get('/', (req, res) => {
    if (req.session.user) {
        return res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }
    res.render('login', { error: null, success: null });
});

router.post('/login', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.render('login', { 
            error: 'Email is required', 
            success: null 
        });
    }
    
    req.session.email = email;
    console.log("Email set in session:", req.session.email);
    res.redirect('/index.html');
});

router.get('/success', (req, res) => {
    if (!req.session.email) {
        return res.redirect('/login');
    }
    res.render('success', { ticketId: req.query.ticketId });
});

router.get('/check-status', ticketController.checkTicketStatus);
router.get('/status/:ticketId', ticketController.checkTicketStatus);
router.get('/download/:ticketId', ticketController.downloadTicket);

router.post('/create-ticket', 
    upload.single('attachment'),
    verifyCaptcha,
    ticketController.createTicket
);

module.exports = router;