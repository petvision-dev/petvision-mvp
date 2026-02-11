const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { verifyToken } = require('../middleware/auth');

// GET /api/health/pets/:petId - Get health records for a pet
router.get('/pets/:petId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.petId;
    
    // Verify user owns this pet
    const petCheck = await db.query(
      'SELECT id FROM pets WHERE id = $1 AND user_id = $2',
      [petId, userId]
    );
    
    if (petCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    
    const result = await db.query(
      'SELECT * FROM health_records WHERE pet_id = $1 ORDER BY recorded_at DESC LIMIT 100',
      [petId]
    );
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching health records:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch health records' });
  }
});

// POST /api/health - Create new health record
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      pet_id, record_type, title, description, severity, image_url, symptoms
    } = req.body;
    
    // Verify user owns this pet
    const petCheck = await db.query(
      'SELECT id FROM pets WHERE id = $1 AND user_id = $2',
      [pet_id, userId]
    );
    
    if (petCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    
    const result = await db.query(
      `INSERT INTO health_records 
       (pet_id, record_type, title, description, severity, image_url, symptoms) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [pet_id, record_type, title, description, severity, image_url,
       JSON.stringify(symptoms || [])]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating health record:', error);
    res.status(500).json({ success: false, error: 'Failed to create health record' });
  }
});

// DELETE /api/health/:id - Delete health record
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const recordId = req.params.id;
    
    const result = await db.query(
      `DELETE FROM health_records 
       WHERE id = $1 AND pet_id IN (SELECT id FROM pets WHERE user_id = $2) 
       RETURNING *`,
      [recordId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    
    res.json({ success: true, message: 'Health record deleted' });
  } catch (error) {
    console.error('Error deleting health record:', error);
    res.status(500).json({ success: false, error: 'Failed to delete health record' });
  }
});

module.exports = router;
