const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register
router.post('/register', async (req, res) => {
  let { username, password, role, name } = req.body;
  if (username) username = username.toLowerCase(); // Force lowercase for consistency
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    
    // If it's a student, we might want to create a Student profile too
    if (role === 'STUDENT') {
      const { Student } = require('../models');
      await Student.create({ name: name || username, userId: user.id });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  if (username) username = username.toLowerCase(); // Force lowercase for consistency

  console.log(`\n🔑 [ AUTH ]: Login attempt for Node [ ${username} ]`);
  
  try {
    // Try exact (normalized) match first
    let user = await User.findOne({ where: { username } });
    
    // Fallback: Case-insensitive search if normalization failed for older records
    if (!user) {
      const { Op } = require('sequelize');
      user = await User.findOne({ 
        where: { 
          username: { [Op.iLike]: username } 
        } 
      });
    }
    
    if (!user) {
      console.log(`❌ [ AUTH ]: Node [ ${username} ] - IDENTITY NOT FOUND`);
      return res.status(404).json({ message: '[ ERROR ]: Identity Node Not Found. Please verify Credentials.' });
    }

    console.log(`📡 [ AUTH ]: Node [ ${username} ] - Found. Synchronizing Sequences...`);
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log(`❌ [ AUTH ]: Node [ ${username} ] - SEQUENCE MISMATCH`);
      return res.status(400).json({ message: '[ ERROR ]: Sequence Mismatch. Entry Denied.' });
    }

    console.log(`✅ [ AUTH ]: Node [ ${username} ] - ACCESS GRANTED`);
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(`🚨 [ AUTH ]: CRITICAL ERROR - ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
