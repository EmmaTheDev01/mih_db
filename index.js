const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single('file');

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Route files
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const stockRoutes = require('./routes/stock');
const appointmentRoutes = require('./routes/appointment');
const talentRoutes = require('./routes/talent');

// Root route
app.get('/', (req, res) => {
  res.send('App is running');
});

// Upload route
app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  cloudinary.uploader.upload(req.file.path, { folder: 'events' }, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error uploading to Cloudinary', error: error.message });
    }
    res.status(200).json({ message: 'File uploaded successfully', fileUrl: result.secure_url });
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/talent', talentRoutes);

// Database connection and server startup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();
