const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Ensure the path is correct
const router = express.Router();

// Registration endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:',  email, password ); // Debugging log

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('Stored hashed password:', user.password); // Debugging log
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Debugging log

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error logging in: ' + error });
  }
});




router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, username, email, password});
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user '+error });
  }
});

// Login endpoint


module.exports = router;
