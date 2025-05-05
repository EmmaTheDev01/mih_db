const express = require('express');
const router = express.Router();

const {
  createStock,
  getAllStock,
  getStockById,
  updateStock,
  deleteStock,
} = require('../controllers/stockController');

const { verifyAdmin } = require('../utils/verifyToken')
// Admin-only access to all stock routes
router.post('/', verifyAdmin, createStock);
router.get('/', verifyAdmin, getAllStock);
router.get('/:id', verifyAdmin, getStockById);
router.put('/:id', verifyAdmin, updateStock);
router.delete('/:id', verifyAdmin, deleteStock);

module.exports = router;
