const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Make sure email is unique
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length of password
    },
    profilePicture: {
      // Cloudinary URL (you will save this URL after uploading to Cloudinary)
      type: String,
      default: 'https://example.com/default-profile.png', // Default profile picture
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user', // Default role is 'user'
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      trim: true,
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

// Hash password before saving (use bcrypt)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();  // If password is not modified, skip hashing
  }
  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash password
    next();
  } catch (err) {
    next(err);  // If there's an error, pass it to the next middleware
  }
});

// Compare entered password with stored hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
