// seedCourses.js
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

// Your featured courses array
const featuredCourses = [
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    subtitle: 'AI is not only for engineers. If you want your organization to become better at using AI, this is the course to tell everyone--especially your non-technical colleagues--to take.',
    // Replace process.env.PUBLIC_URL with a static path or URL if needed in the backend context.
    thumbnail: '/images/course-thumbnails/ai.jpg',
    category: 'AI',
    difficulty: 'Beginner',
    duration: '5 hours',
    modules: 4,
    badges: ['NEW'],
    instructor: {
      name: 'Andrew Ng',
      title: 'Top Instructor',
      avatar: '/images/instructors/coursera.png'
    },
    externalLink: 'https://www.coursera.org/learn/ai-for-everyone'
  },
  {
    id: 'ai-nano-degree-program',
    title: 'Artificial Intelligence Nanodegree Program',
    subtitle: 'Master the foundations of artificial intelligence by exploring essential AI techniques, including search algorithms, symbolic logic, and planning systems.',
    thumbnail: '/images/course-thumbnails/ai2.jpg',
    category: 'AI',
    difficulty: 'Intermediate',
    duration: '2 months',
    modules: 8,
    badges: ['NEW'],
    instructor: {
      name: 'Peter Norvig',
      title: 'Research Director, Google',
      avatar: '/images/instructors/udacity.jpeg'
    },
    externalLink: 'https://www.udacity.com/course/ai-artificial-intelligence-nanodegree--nd898'
  },
  {
    id: 'ai-cs-professional',
    title: 'Professional Certificate in Computer Science for Artificial Intelligence',
    subtitle: 'Join Harvard Online in this series of CS50 courses taught by renowned faculty to solve important real-world problems and future-proof your career.',
    thumbnail: '/images/course-thumbnails/ai3.jpg',
    category: 'AI',
    difficulty: 'Advanced',
    duration: '6 months',
    modules: 12,
    badges: ['NEW'],
    instructor: {
      name: 'David J. Malan',
      title: 'Professor, Harvard University',
      avatar: '/images/instructors/harvard.png'
    },
    externalLink: 'https://www.harvardonline.harvard.edu/course/professional-certificate-computer-science-artificial-intelligence'
  },
  {
    id: 'ml-with-databricks',
    title: 'Machine Learning with Databricks',
    subtitle: 'Dive into data preparation, model development, deployment, and operations, guided by expert instructors.',
    thumbnail: '/images/course-thumbnails/ai4.jpg',
    category: 'ML',
    difficulty: 'Beginner',
    duration: '16 hours',
    modules: 4,
    badges: ['NEW'],
    instructor: {
      name: 'Anonymous',
      title: 'None',
      avatar: '/images/instructors/databricks.jpg'
    },
    externalLink: 'https://www.databricks.com/training/catalog/machine-learning-with-databricks-2422'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');
  
  // (Optional) Clear existing courses:
  await Course.deleteMany({});
  
  // Insert the featured courses
  const insertedCourses = await Course.insertMany(featuredCourses);
  console.log('Courses inserted successfully:', insertedCourses);

  // Close the connection and exit the process
  mongoose.connection.close();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
