const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    purposeOfVisit: {
      type: String,
      required: true,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String, // You can also use a Date or Time field depending on your use case
      required: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
      default: 'No additional information provided', // Default value if no details are provided
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending', // Default appointment status
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
AppointmentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
