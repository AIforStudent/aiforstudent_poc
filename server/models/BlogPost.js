// models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  coverImage: String,
  category: String,
  author: {
    name: String,
    avatar: String,
    title: String, // optional, if you want to include a title for the author
  },
  date: { type: Date, default: Date.now },
  readTime: Number,
  tags: [String],
  externalLink: String,
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
