export const aiRoadmaps = [
  {
    id: 'stem',
    title: 'AI Learning Path for STEM Students',
    description: 'For students with technical backgrounds, this learning path covers machine learning algorithms, deep learning fundamentals, neural networks, and implementation of AI models.',
    image: '/images/roadmaps/stem-ai.jpg',
    audience: 'STEM Students',
    resources: 12,
    difficulty: 'Intermediate',
    topics: [
      {
        name: 'Fundamentals of Machine Learning',
        description: 'Learn the core concepts and algorithms of machine learning',
        modules: 5
      },
      {
        name: 'Deep Learning & Neural Networks',
        description: 'Explore the architecture and applications of neural networks',
        modules: 4
      },
      {
        name: 'AI Programming with Python',
        description: 'Implement AI algorithms using Python and popular frameworks',
        modules: 6
      },
      {
        name: 'Computer Vision Applications',
        description: 'Build applications that can interpret and analyze visual information',
        modules: 3
      },
      {
        name: 'Natural Language Processing',
        description: 'Develop systems that understand and generate human language',
        modules: 4
      }
    ]
  },
  {
    id: 'non-stem',
    title: 'AI Learning Path for Non-STEM Students',
    description: 'An accessible introduction to AI for students from humanities, arts, business, and social sciences, focusing on applications, ethics, and user experience.',
    image: '/images/roadmaps/non-stem-ai.jpg',
    audience: 'Non-STEM Students',
    resources: 10,
    difficulty: 'Beginner',
    topics: [
      {
        name: 'Introduction to AI Concepts',
        description: 'Understand the fundamental concepts and terminology of AI',
        modules: 3
      },
      {
        name: 'AI Applications in Society',
        description: 'Explore how AI is transforming various fields and industries',
        modules: 4
      },
      {
        name: 'Ethical Considerations in AI',
        description: 'Examine the ethical implications and challenges of AI systems',
        modules: 3
      },
      {
        name: 'AI for Creativity',
        description: 'Learn how AI tools can enhance creative processes and projects',
        modules: 3
      },
      {
        name: 'No-Code AI Tools',
        description: 'Use accessible tools to implement AI without programming knowledge',
        modules: 5
      }
    ]
  },
  {
    id: 'education',
    title: 'AI Learning Path for Educational Institutes',
    description: 'Resources for academic departments and faculty to integrate AI education into curricula, develop courses, and create interdisciplinary AI programs.',
    image: '/images/roadmaps/education-ai.jpg',
    audience: 'Educators & Institutions',
    resources: 8,
    difficulty: 'Advanced',
    topics: [
      {
        name: 'Curriculum Development',
        description: 'Create comprehensive AI education curricula for various disciplines',
        modules: 4
      },
      {
        name: 'Teaching AI Concepts',
        description: 'Effective methodologies for teaching AI to diverse student populations',
        modules: 3
      },
      {
        name: 'Interdisciplinary AI Programs',
        description: 'Design cross-departmental AI initiatives and collaborations',
        modules: 3
      },
      {
        name: 'AI Research Integration',
        description: 'Incorporate AI research opportunities into undergraduate education',
        modules: 4
      },
      {
        name: 'AI Education Resources',
        description: 'Tools, platforms, and materials for teaching AI effectively',
        modules: 5
      }
    ]
  }
];

export const getAiRoadmapById = (id) => {
  return aiRoadmaps.find(roadmap => roadmap.id === id);
};