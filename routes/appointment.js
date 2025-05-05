const express = require('express');
const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

const { verifyAdmin } = require('../utils/verifyToken');

// Public route to create an appointment
router.post('/', createAppointment);

// Admin-only routes
router.get('/', verifyAdmin, getAllAppointments);
router.get('/:id', verifyAdmin, getAppointmentById);
router.put('/:id', verifyAdmin, updateAppointment);
router.delete('/:id', verifyAdmin, deleteAppointment);

module.exports = router;
