require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/culinary', require('./routes/culinaryRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/itinerary', require('./routes/itineraryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/culture', require('./routes/cultureRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
