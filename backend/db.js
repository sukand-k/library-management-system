// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error('Missing MONGO_URL in environment');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
