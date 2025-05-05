const Event = require('../models/Event'); // Import the Event model
const cloudinary = require('../utils/cloudinaryConfig'); // Import Cloudinary utility
const { upload } = require('../utils/multerConfig'); // Import multer upload config

// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'events',
      eager: [{ width: 400, height: 300, crop: 'fill' }],
    });
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    console.error('Error uploading image to Cloudinary:', err);
    throw new Error('Error uploading image to Cloudinary');
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    // Handle file uploads with Multer
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading files:', err);
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      let eventPictureUrl = '';

      // If file exists in the request, upload it to Cloudinary
      if (req.file) {
        const eventPicture = await uploadImageToCloudinary(req.file);
        eventPictureUrl = eventPicture.url;
      }

      // Destructure other event fields from the body
      const { eventName, eventDescription, startDate, endDate, category, location, organizer, contactEmail, registrationLink } = req.body;
      
      // Create the event document
      const newEvent = new Event({
        eventName,
        eventDescription,
        photo: eventPictureUrl, // Cloudinary URL for the picture
        startDate,
        endDate,
        category,
        location,
        organizer,
        contactEmail,
        registrationLink,
      });

      // Save event to the database
      await newEvent.save();

      // Return success response
      return res.status(201).json({ message: 'Event created successfully', newEvent });
    });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
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
    console.error('Error fetching event:', err);
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
    console.error('Error updating event:', err);
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
    console.error('Error deleting event:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
