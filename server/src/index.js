const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect DB
if (!process.env.MONGO_URI) {
  console.warn('MONGO_URI not set. See .env.example');
} else {
  connectDB(process.env.MONGO_URI);
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// basic health
app.get('/', (req, res) => res.json({ message: 'E-commerce API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
