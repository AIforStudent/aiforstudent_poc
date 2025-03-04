export const featuredCourses = [
  {
    id: 'frontend-developer',
    title: 'The Frontend Developer Career Path',
    subtitle: 'Launch your career as a frontend developer with this immersive path.',
    thumbnail: '/images/course-thumbnails/frontend-dev.jpg',
    category: 'Frontend',
    difficulty: 'Beginner',
    duration: '81.5 hrs',
    modules: 70,
    badges: ['PRO', 'UPDATED'],
    instructor: {
      name: 'Alex Johnson',
      title: 'Senior Frontend Developer',
      avatar: '/images/instructors/alex.jpg'
    }
  },
  {
    id: 'react-basics',
    title: 'React Basics',
    subtitle: 'Learn the fundamentals of building interactive UIs with React.',
    thumbnail: '/images/course-thumbnails/react-basics.jpg',
    category: 'React',
    difficulty: 'Intermediate',
    duration: '15.1 hrs',
    modules: 12,
    badges: ['NEW'],
    instructor: {
      name: 'Sarah Miller',
      title: 'React Developer',
      avatar: '/images/instructors/sarah.jpg'
    }
  },
  {
    id: 'ai-engineer',
    title: 'The AI Engineer Path',
    subtitle: 'Build apps powered by generative AI - an essential 2025 skill.',
    thumbnail: '/images/course-thumbnails/ai-engineer.jpg',
    category: 'AI',
    difficulty: 'Intermediate',
    duration: '9.7 hrs',
    modules: 8,
    badges: ['PRO', 'NEW'],
    instructor: {
      name: 'David Chen',
      title: 'AI Researcher',
      avatar: '/images/instructors/david.jpg'
    }
  },
  {
    id: 'advanced-javascript',
    title: 'Advanced JavaScript',
    subtitle: 'Master advanced JavaScript concepts through hands-on challenges.',
    thumbnail: '/images/course-thumbnails/advanced-js.jpg',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    duration: '11 hrs',
    modules: 10,
    badges: ['PRO', 'NEW'],
    instructor: {
      name: 'Michael Rodriguez',
      title: 'JavaScript Expert',
      avatar: '/images/instructors/michael.jpg'
    }
  }
];

export const getCourseById = (id) => {
  return featuredCourses.find(course => course.id === id);
};