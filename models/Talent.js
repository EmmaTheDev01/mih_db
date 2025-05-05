const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'], // add or customize job types
  },
  requiredSkills: {
    type: [String],
    required: true,
    validate: [skills => skills.length > 0, 'Please select at least one skill.'],
  },
  jobDescription: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Talent', TalentSchema);
