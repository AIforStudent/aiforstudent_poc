// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  thumbnail: String,
  category: String,
  difficulty: String,
  duration: String,
  modules: Number,
  badges: [String],
  instructor: {
    name: String,
    title: String,
    avatar: String,
  },
  externalLink: String,
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
