export const featuredCourses = [
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    subtitle: 'AI is not only for engineers. If you want your organization to become better at using AI, this is the course to tell everyone--especially your non-technical colleagues--to take.',
    thumbnail: process.env.PUBLIC_URL + '/images/course-thumbnails/ai.jpg',
    category: 'AI',
    difficulty: 'Beginner',
    duration: '5 hours',
    modules: 4,
    badges: ['NEW'],
    instructor: {
      name: 'Andrew Ng',
      title: 'Top Instructor',
      avatar: process.env.PUBLIC_URL + '/images/instructors/coursera.png'
    },
    externalLink: 'https://www.coursera.org/learn/ai-for-everyone'
  },
  {
    id: 'ai-nano-degree-program',
    title: 'Artificial Intelligence Nanodegree Program',
    subtitle: 'Master the foundations of artificial intelligence by exploring essential AI techniques, including search algorithms, symbolic logic, and planning systems.',
    thumbnail: process.env.PUBLIC_URL + '/images/course-thumbnails/ai2.jpg',
    category: 'AI',
    difficulty: 'Intermediate',
    duration: '2 months',
    modules: 8,
    badges: ['NEW'],
    instructor: {
      name: 'Peter Norvig',
      title: 'Research Director, Google',
      avatar: process.env.PUBLIC_URL + '/images/instructors/udacity.jpeg'
    },
    externalLink: 'https://www.udacity.com/course/ai-artificial-intelligence-nanodegree--nd898'
  },
  {
    id: 'ai-cs-professional',
    title: 'Professional Certificate in Computer Science for Artificial Intelligence',
    subtitle: 'Join Harvard Online in this series of CS50 courses taught by renowned faculty to solve important real-world problems and future-proof your career.',
    thumbnail: process.env.PUBLIC_URL + '/images/course-thumbnails/ai3.jpg',
    category: 'AI',
    difficulty: 'Advanced',
    duration: '6 months',
    modules: 12,
    badges: ['NEW'],
    instructor: {
      name: 'David J. Malan',
      title: 'Professor, Harvard University',
      avatar: process.env.PUBLIC_URL + '/images/instructors/harvard.png'
    },
    externalLink: 'https://www.harvardonline.harvard.edu/course/professional-certificate-computer-science-artificial-intelligence'
  },
  {
    id: 'ml-with-databricks',
    title: 'Machine Learning with Databricks',
    subtitle: 'Dive into data preparation, model development, deployment, and operations, guided by expert instructors.',
    thumbnail: process.env.PUBLIC_URL + '/images/course-thumbnails/ai4.jpg',
    category: 'ML',
    difficulty: 'Beginner',
    duration: '16 hours',
    modules: 4,
    badges: ['NEW'],
    instructor: {
      name: 'Anonymous',
      title: 'None',
      avatar: process.env.PUBLIC_URL + '/images/instructors/databricks.jpg'
    },
    externalLink: 'https://www.databricks.com/training/catalog/machine-learning-with-databricks-2422'
  }
];

export const getCourseById = (id) => {
  return featuredCourses.find(course => course.id === id);
};