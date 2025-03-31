// models/Roadmap.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: String,
  description: String,
  modules: Number,
});

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  audience: String,
  resources: Number,
  difficulty: String,
  topics: [topicSchema],
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
