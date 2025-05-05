const express = require('express');
const router = express.Router();

const {
  createTalent,
  getAllTalent,
  getTalentById,
  updateTalent,
  deleteTalent
} = require('../controllers/talentController');

const { verifyAdmin } = require('../utils/verifyToken');

// Public route to create a talent entry (e.g. job post)
router.post('/', createTalent);

// Admin-only routes
router.get('/', getAllTalent);
router.get('/:id', getTalentById);
router.put('/:id', verifyAdmin, updateTalent);
router.delete('/:id', verifyAdmin, deleteTalent);

module.exports = router;
