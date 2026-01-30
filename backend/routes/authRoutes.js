// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Import Local Auth Controllers (for Email/Password)
const { registerUser, loginUser } = require('../controllers/authController');

// ==========================================
// LOCAL AUTHENTICATION ROUTES (Email/Password)
// ==========================================

// @desc    Register a new user
// @route   POST /auth/register
router.post('/register', registerUser);

// @desc    Login user
// @route   POST /auth/login
router.post('/login', loginUser);


// ==========================================
// GOOGLE AUTHENTICATION ROUTES
// ==========================================

// @desc    Auth with Google
// @route   GET /auth/google
// This triggers the Google consent screen
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// Google redirects here after user consents
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        // Successful authentication!
        // Redirect the user back to the React Frontend Dashboard
        res.redirect('http://localhost:3000/dashboard');
    }
);


// ==========================================
// USER MANAGEMENT ROUTES
// ==========================================

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        // Redirect back to landing page after logout
        res.redirect('http://localhost:3000/');
    });
});

// @desc    Get current logged in user
// @route   GET /auth/current_user
// Frontend calls this to check if user is logged in
router.get('/current_user', (req, res) => {
    // req.user is attached by Passport if the session is valid
    res.send(req.user);
});

module.exports = router;