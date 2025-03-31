// models/AINews.js
const mongoose = require('mongoose');

const aiNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  link: String,
  date: { type: Date, default: Date.now },
  source: String,
  author: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('AINews', aiNewsSchema);
