const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
require('./db'); // Adjust path if needed

// Middleware
app.use(cors());
app.use(express.json());

// Serve the uploads folder as static so images are accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/products', require('./routes/productroute')); // your product routes including multer

app.use('/api', require('./routes/user'));

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}`);
});
