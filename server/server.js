const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const path = require('path');

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
const commentRoutes = require('./routes/commentRoute');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
