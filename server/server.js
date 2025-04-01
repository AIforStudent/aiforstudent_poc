require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register Routes
const blogRoutes = require('./routes/blogs');
const courseRoutes = require('./routes/courses');
const roadmapRoutes = require('./routes/roadmaps');
const aiNewsRoutes = require('./routes/aiNews');

app.use('/api/blogs', blogRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/ai-news', aiNewsRoutes);

// Basic root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
