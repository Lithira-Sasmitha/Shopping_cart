const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');        // your MongoDB connection
const userRoutes = require('./routes/userRoute');
const path = require('path');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());                          // Enable CORS for all origins (adjust if needed)
app.use(express.json());                  // Parse JSON bodies

// Serve static files from uploads folder for profile pics
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);

// Test route to check server is running
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Catch-all for unknown routes (optional, improves debugging)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
