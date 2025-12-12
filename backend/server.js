// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./db');

const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// log every incoming request (debug)
app.use((req, res, next) => {
  console.log('INCOMING', req.method, req.path);
  next();
});

connectDB();

app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);
console.log('Auth router mounted');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
