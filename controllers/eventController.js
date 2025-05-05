const Event = require('../models/Event'); // Import the Event model

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, eventDescription, eventPicture, startDate, endDate, category, location, organizer, contactEmail, registrationLink } = req.body;
    
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventPicture,
      startDate,
      endDate,
      category,
      location,
      organizer,
      contactEmail,
      registrationLink,
    });

    await newEvent.save();
    return res.status(201).json({ message: 'Event created successfully', newEvent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json(event);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
