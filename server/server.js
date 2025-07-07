const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoute');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded profile pictures
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User routes
app.use('/api/users', userRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
