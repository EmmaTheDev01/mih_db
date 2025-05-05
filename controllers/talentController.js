const Talent = require('../models/Talent'); // Import the Talent model

// Create a new talent entry
exports.createTalent = async (req, res) => {
  try {
    const { companyName, contactPerson, emailAddress, phoneNumber, jobTitle, jobType, requiredSkills, jobDescription } = req.body;
    
    const newTalent = new Talent({
      companyName,
      contactPerson,
      emailAddress,
      phoneNumber,
      jobTitle,
      jobType,
      requiredSkills,
      jobDescription,
    });

    await newTalent.save();
    return res.status(201).json({ message: 'Talent entry created successfully', newTalent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all talent entries
exports.getAllTalent = async (req, res) => {
  try {
    const talent = await Talent.find();
    return res.status(200).json(talent);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single talent entry by ID
exports.getTalentById = async (req, res) => {
  try {
    const talent = await Talent.findById(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });
    return res.status(200).json(talent);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update talent by ID
exports.updateTalent = async (req, res) => {
  try {
    const updatedTalent = await Talent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTalent) return res.status(404).json({ message: 'Talent not found' });
    return res.status(200).json({ message: 'Talent updated successfully', updatedTalent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a talent entry by ID
exports.deleteTalent = async (req, res) => {
  try {
    const deletedTalent = await Talent.findByIdAndDelete(req.params.id);
    if (!deletedTalent) return res.status(404).json({ message: 'Talent not found' });
    return res.status(200).json({ message: 'Talent deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
