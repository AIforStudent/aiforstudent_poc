export const recentBlogs = [
  {
    id: 'getting-started-frontend',
    title: 'Getting Started with Frontend Development in 2025',
    excerpt: 'Learn the essential tools, frameworks, and best practices for modern frontend development.',
    coverImage: '/images/blog-images/frontend-dev-2025.jpg',
    category: 'Frontend',
    author: {
      name: 'Alex Johnson',
      avatar: '/images/instructors/alex.jpg'
    },
    date: 'March 1, 2025',
    readTime: 8,
    tags: ['HTML', 'CSS', 'JavaScript', 'Career']
  },
  {
    id: 'ai-for-students',
    title: 'How USC Students Can Leverage AI in Their Studies',
    excerpt: 'Discover practical ways to use AI tools to enhance your learning experience at USC.',
    coverImage: '/images/blog-images/ai-for-students.jpg',
    category: 'AI',
    author: {
      name: 'Emily Wong',
      avatar: '/images/instructors/emily.jpg'
    },
    date: 'February 28, 2025',
    readTime: 6,
    tags: ['AI', 'Education', 'Student Life']
  },
  {
    id: 'react-vs-angular',
    title: 'React vs Angular: Which Should USC Students Learn in 2025?',
    excerpt: 'A comparison of two popular frontend frameworks from a career perspective for USC graduates.',
    coverImage: '/images/blog-images/react-vs-angular.jpg',
    category: 'Frameworks',
    author: {
      name: 'Sarah Miller',
      avatar: '/images/instructors/sarah.jpg'
    },
    date: 'February 25, 2025',
    readTime: 10,
    tags: ['React', 'Angular', 'Career']
  },
  {
    id: 'web-accessibility',
    title: 'Web Accessibility: Building Inclusive Websites',
    excerpt: 'Why accessibility matters and how to implement it in your web projects.',
    coverImage: '/images/blog-images/web-accessibility.jpg',
    category: 'Frontend',
    author: {
      name: 'James Lee',
      avatar: '/images/instructors/james.jpg'
    },
    date: 'February 20, 2025',
    readTime: 7,
    tags: ['Accessibility', 'HTML', 'UX/UI']
  }
];

export const getBlogById = (id) => {
  return recentBlogs.find(blog => blog.id === id);
};