const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
require('./db'); // Make sure your db.js is in a 'config' folder

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}`);
});
