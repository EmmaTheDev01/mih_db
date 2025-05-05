const express = require('express');
const { register, login, updateProfile, logout } = require('../controllers/authController'); // Import your controller functions
const {verifyUser} = require('../utils/verifyToken')

const router = express.Router();

// Register route
router.post('/register', register); // Route for user registration

// Login route
router.post('/login', login); // Route for user login

// Profile update route - Protected route (must be logged in)
router.put('/profile', verifyUser, updateProfile); // Update profile for the logged-in user

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token'); // Clear the auth token cookie
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
