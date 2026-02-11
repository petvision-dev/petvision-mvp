const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// POST /api/auth/user - Get or create user from Clerk token
router.post('/user', async (req, res) => {
  try {
    const { clerk_id, email, first_name, last_name, avatar_url } = req.body;
    
    if (!clerk_id || !email) {
      return res.status(400).json({ success: false, error: 'clerk_id and email are required' });
    }
    
    // Check if user exists
    const existingUser = await db.query(
      'SELECT id, email, first_name, last_name, avatar_url FROM users WHERE clerk_id = $1',
      [clerk_id]
    );
    
    if (existingUser.rows.length > 0) {
      // User exists, update if needed
      const updatedUser = await db.query(
        `UPDATE users SET 
         email = COALESCE($1, email),
         first_name = COALESCE($2, first_name),
         last_name = COALESCE($3, last_name),
         avatar_url = COALESCE($4, avatar_url)
         WHERE clerk_id = $5
         RETURNING id, email, first_name, last_name, avatar_url`,
        [email, first_name, last_name, avatar_url, clerk_id]
      );
      return res.json({ success: true, data: updatedUser.rows[0], isNew: false });
    }
    
    // Create new user
    const newUser = await db.query(
      `INSERT INTO users (clerk_id, email, first_name, last_name, avatar_url) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name, avatar_url`,
      [clerk_id, email, first_name, last_name, avatar_url]
    );
    
    res.status(201).json({ success: true, data: newUser.rows[0], isNew: true });
  } catch (error) {
    console.error('Error handling auth user:', error);
    res.status(500).json({ success: false, error: 'Failed to handle user' });
  }
});

module.exports = router;
