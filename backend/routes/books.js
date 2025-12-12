const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Create book
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, copies = 1 } = req.body;
    const book = new Book({ title, author, isbn, copies, available: copies });
    await book.save();
    res.status(201).json(book);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update book
router.put('/:id', async (req, res) => {
  try {
    const { title, author, isbn, copies } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // if copies changed, adjust available accordingly (simple logic)
    if (copies !== undefined) {
      const diff = copies - book.copies;
      book.copies = copies;
      book.available = Math.max(0, book.available + diff);
    }
    if (title) book.title = title;
    if (author) book.author = author;
    if (isbn) book.isbn = isbn;

    await book.save();
    res.json(book);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
