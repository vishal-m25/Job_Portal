const express = require('express');
const jwt = require('jsonwebtoken'); // Assuming you use JWT for authentication
const User = require('../models/User'); // Assuming you have a User model

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401); // No token found

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user to request object
    next();
  });
};

// Endpoint to get user profile data
router.get('/user-profile', authenticateToken, async (req, res) => {
  try {
    // Assuming `req.user.id` contains the user's
    const user = await User.findById(req.user.id).select('username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
});

module.exports = router;
