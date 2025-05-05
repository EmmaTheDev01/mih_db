const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

const port = process.env.PORT || 6000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("App is running");
});

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

// Start server after DB connection
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
