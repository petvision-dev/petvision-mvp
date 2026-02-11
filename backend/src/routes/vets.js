const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { verifyToken } = require('../middleware/auth');

// GET /api/vets - Get all vets for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT * FROM vets WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching vets:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch vets' });
  }
});

// GET /api/vets/:id - Get single vet
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const vetId = req.params.id;
    const result = await db.query(
      'SELECT * FROM vets WHERE id = $1 AND user_id = $2',
      [vetId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Vet not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching vet:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch vet' });
  }
});

// POST /api/vets - Create new vet
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      clinic_name, veterinarian_name, phone, email,
      address, city, state, postal_code, notes
    } = req.body;
    
    if (!clinic_name) {
      return res.status(400).json({ success: false, error: 'Clinic name is required' });
    }
    
    const result = await db.query(
      `INSERT INTO vets 
       (user_id, clinic_name, veterinarian_name, phone, email, 
        address, city, state, postal_code, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [userId, clinic_name, veterinarian_name, phone, email,
       address, city, state, postal_code, notes]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating vet:', error);
    res.status(500).json({ success: false, error: 'Failed to create vet' });
  }
});

// PUT /api/vets/:id - Update vet
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const vetId = req.params.id;
    const {
      clinic_name, veterinarian_name, phone, email,
      address, city, state, postal_code, notes
    } = req.body;
    
    const result = await db.query(
      `UPDATE vets SET 
       clinic_name = COALESCE($1, clinic_name),
       veterinarian_name = $2,
       phone = $3,
       email = $4,
       address = $5,
       city = $6,
       state = $7,
       postal_code = $8,
       notes = $9
       WHERE id = $10 AND user_id = $11
       RETURNING *`,
      [clinic_name, veterinarian_name, phone, email, address,
       city, state, postal_code, notes, vetId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Vet not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating vet:', error);
    res.status(500).json({ success: false, error: 'Failed to update vet' });
  }
});

// DELETE /api/vets/:id - Delete vet
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const vetId = req.params.id;
    const result = await db.query(
      'DELETE FROM vets WHERE id = $1 AND user_id = $2 RETURNING *',
      [vetId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Vet not found' });
    }
    
    res.json({ success: true, message: 'Vet deleted successfully' });
  } catch (error) {
    console.error('Error deleting vet:', error);
    res.status(500).json({ success: false, error: 'Failed to delete vet' });
  }
});

module.exports = router;
