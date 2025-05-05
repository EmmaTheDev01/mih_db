const Appointment = require('../models/Appointment'); // Import the Appointment model

// Create an appointment
exports.createAppointment = async (req, res) => {
  try {
    const { fullName, emailAddress, phoneNumber, purposeOfVisit, preferredDate, preferredTime, additionalInformation } = req.body;
    
    const newAppointment = new Appointment({
      fullName,
      emailAddress,
      phoneNumber,
      purposeOfVisit,
      preferredDate,
      preferredTime,
      additionalInformation,
    });

    await newAppointment.save();
    return res.status(201).json({ message: 'Appointment booked successfully', newAppointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    return res.status(200).json(appointment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    return res.status(200).json({ message: 'Appointment updated successfully', updatedAppointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    return res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
