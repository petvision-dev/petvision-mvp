const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { verifyToken } = require('../middleware/auth');

// GET /api/reminders - Get all reminders for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT r.*, p.name as pet_name FROM reminders r LEFT JOIN pets p ON r.pet_id = p.id WHERE r.user_id = $1 AND r.is_completed = false ORDER BY r.due_date ASC',
      [userId]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reminders' });
  }
});

// POST /api/reminders - Create new reminder
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { pet_id, reminder_type, title, description, due_date } = req.body;
    
    if (!reminder_type || !title || !due_date) {
      return res.status(400).json({ success: false, error: 'Required fields missing' });
    }
    
    // If pet_id provided, verify ownership
    if (pet_id) {
      const petCheck = await db.query(
        'SELECT id FROM pets WHERE id = $1 AND user_id = $2',
        [pet_id, userId]
      );
      if (petCheck.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Pet not found' });
      }
    }
    
    const result = await db.query(
      `INSERT INTO reminders (user_id, pet_id, reminder_type, title, description, due_date) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, pet_id, reminder_type, title, description, due_date]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ success: false, error: 'Failed to create reminder' });
  }
});

// PUT /api/reminders/:id/complete - Mark reminder as completed
router.put('/:id/complete', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reminderId = req.params.id;
    
    const result = await db.query(
      `UPDATE reminders SET is_completed = true, completed_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [reminderId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Reminder not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error completing reminder:', error);
    res.status(500).json({ success: false, error: 'Failed to complete reminder' });
  }
});

// DELETE /api/reminders/:id - Delete reminder
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reminderId = req.params.id;
    
    const result = await db.query(
      'DELETE FROM reminders WHERE id = $1 AND user_id = $2 RETURNING *',
      [reminderId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Reminder not found' });
    }
    
    res.json({ success: true, message: 'Reminder deleted' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ success: false, error: 'Failed to delete reminder' });
  }
});

module.exports = router;
