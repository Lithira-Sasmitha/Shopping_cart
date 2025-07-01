const express = require('express');
const cors = require('cors');
const app = express();

// Connect to MongoDB
require('./db'); // <-- Adjust the path if needed

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}`);
});
