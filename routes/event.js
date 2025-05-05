const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { verifyAdmin} = require('../utils/verifyToken');

// Route to create a new event (only admins can create events)
router.post('/create', verifyAdmin, createEvent);

// Route to get all events
router.get('/', getAllEvents);

// Route to get a single event by ID
router.get('/:id', getEventById);

// Route to update an event by ID
router.put('/:id', verifyAdmin, updateEvent); // Optionally, only admins can update events

// Route to delete an event by ID
router.delete('/:id', verifyAdmin, deleteEvent); // Optionally, only admins can delete events

module.exports = router;
