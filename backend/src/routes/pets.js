const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { verifyToken } = require('../middleware/auth');

// GET /api/pets - Get all pets for authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT id, name, species, breed, birth_date, gender, weight, weight_unit, profile_photo_url, neutered_spayed, color, notes FROM pets WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pets' });
  }
});

// GET /api/pets/:id - Get single pet
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;
    const result = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pet' });
  }
});

// POST /api/pets - Create new pet
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name, species, breed, birth_date, gender, weight, weight_unit,
      profile_photo_url, microchip_id, neutered_spayed, color, notes
    } = req.body;
    
    if (!name || !species) {
      return res.status(400).json({ success: false, error: 'Name and species are required' });
    }
    
    const result = await db.query(
      `INSERT INTO pets 
       (user_id, name, species, breed, birth_date, gender, weight, weight_unit, 
        profile_photo_url, microchip_id, neutered_spayed, color, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [userId, name, species, breed, birth_date, gender, weight, weight_unit,
       profile_photo_url, microchip_id, neutered_spayed, color, notes]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ success: false, error: 'Failed to create pet' });
  }
});

// PUT /api/pets/:id - Update pet
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;
    const {
      name, species, breed, birth_date, gender, weight, weight_unit,
      profile_photo_url, microchip_id, neutered_spayed, color, notes
    } = req.body;
    
    const result = await db.query(
      `UPDATE pets SET 
       name = COALESCE($1, name),
       species = COALESCE($2, species),
       breed = $3,
       birth_date = $4,
       gender = $5,
       weight = $6,
       weight_unit = $7,
       profile_photo_url = $8,
       microchip_id = $9,
       neutered_spayed = $10,
       color = $11,
       notes = $12
       WHERE id = $13 AND user_id = $14
       RETURNING *`,
      [name, species, breed, birth_date, gender, weight, weight_unit,
       profile_photo_url, microchip_id, neutered_spayed, color, notes, petId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pet not found or not authorized' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ success: false, error: 'Failed to update pet' });
  }
});

// DELETE /api/pets/:id - Delete pet
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;
    const result = await db.query(
      'DELETE FROM pets WHERE id = $1 AND user_id = $2 RETURNING *',
      [petId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pet not found or not authorized' });
    }
    
    res.json({ success: true, message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ success: false, error: 'Failed to delete pet' });
  }
});

module.exports = router;
