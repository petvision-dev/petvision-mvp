const jwt = require('jsonwebtoken');
const db = require('../db/connection');

// Verify Clerk token and get user from database
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    
    // Verify token with Clerk (in production, verify with Clerk API)
    // For now, we'll decode and get clerk_id
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
    
    const clerkId = decoded.sub;
    
    // Get or create user in database
    const userResult = await db.query(
      'SELECT id, email, first_name, last_name, avatar_url FROM users WHERE clerk_id = $1',
      [clerkId]
    );
    
    if (userResult.rows.length === 0) {
      // Create new user (first login)
      const newUser = await db.query(
        `INSERT INTO users (clerk_id, email) VALUES ($1, $2) RETURNING id, email, first_name, last_name`,
        [clerkId, decoded.email || 'unknown@example.com']
      );
      req.user = newUser.rows[0];
    } else {
      req.user = userResult.rows[0];
    }
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};

module.exports = { verifyToken };
