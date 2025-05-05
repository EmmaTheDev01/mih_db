const mongoose = require('mongoose');

// Cloudinary config would typically be handled elsewhere, for example, in a config file.
const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDescription: {
      type: String,
      required: true,
      trim: true,
    },
    eventPicture: {
      // Cloudinary URL (you will save this URL after uploading to Cloudinary)
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ['Workshop', 'Hackathon', 'Conference', 'Meetup', 'Seminar'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    registrationLink: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add a pre-save hook to update `updatedAt` field automatically
EventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', EventSchema);
