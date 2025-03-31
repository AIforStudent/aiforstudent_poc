// routes/aiNews.js
const express = require('express');
const router = express.Router();
const AINews = require('../models/AINews');

// GET all AI news items
router.get('/', async (req, res) => {
  try {
    const news = await AINews.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single AI news item by ID
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await AINews.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News item not found' });
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new AI news item
router.post('/', async (req, res) => {
  const newsItem = new AINews(req.body);
  try {
    const newNewsItem = await newsItem.save();
    res.status(201).json(newNewsItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an AI news item
router.put('/:id', async (req, res) => {
  try {
    const updatedNewsItem = await AINews.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNewsItem) return res.status(404).json({ message: 'News item not found' });
    res.json(updatedNewsItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an AI news item
router.delete('/:id', async (req, res) => {
  try {
    const deletedNewsItem = await AINews.findByIdAndDelete(req.params.id);
    if (!deletedNewsItem) return res.status(404).json({ message: 'News item not found' });
    res.json({ message: 'News item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
