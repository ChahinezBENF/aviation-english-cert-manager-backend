const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const router = express.Router();

// Login endpoint
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {

//     const user = await User.findOne({ email });

//      if (!user) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );
//     res.json({
//       id: user._id,  
//       email: user.email,
//       role: user.role,
//       token: token
//     });

//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`Login failed: User with email ${email} not found.`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error(`Login failed: Incorrect password for email ${email}.`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with user data and token
    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      token: token
    });
  } catch (err) {
    console.error('Internal server error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
