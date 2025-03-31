// routes/roadmaps.js
const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// GET all roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single roadmap by ID
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new roadmap
router.post('/', async (req, res) => {
  const roadmap = new Roadmap(req.body);
  try {
    const newRoadmap = await roadmap.save();
    res.status(201).json(newRoadmap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a roadmap
router.put('/:id', async (req, res) => {
  try {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json(updatedRoadmap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a roadmap
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!deletedRoadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
