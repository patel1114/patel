const express = require('express');
const router = express.Router();
const userController = require('../contollers/userController'); // Fixed typo in 'controllers'


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Login page
router.get('/login', (req, res) => {
    res.render('login', { error: null, success: null });
});

// Register page (Separate register page if needed)
router.get('/register', (req, res) => {
    res.render('register', { error: null, success: null });  // Directly render a register page, separate from login
});

// Register user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Logout user
router.get('/logout', userController.logout);

// Dashboard (protected route)
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

module.exports = router;
