// src/data/blogPosts.js

// Sample blog posts data with more posts
export const blogPosts = [
  {
    id: 'openai-gpt-4-5',
    title: 'Everything You Need to Know About OpenAI’s GPT-4.5',
    excerpt: 'Since the beginning of 2025, we have been seeing the launch of one amazing model after another – from DeepSeek-R1 and o3-mini to Grok 3 and Claude 3.7 Sonnet. The latest addition to this ever-expanding list of advanced AI models is the much-awaited OpenAI GPT-4.5. This new model in the GPT series brings “Vibe Check” along with enhanced capabilities to ChatGPT’s chatbot interface. It brings LLM supremacy back to OpenAI as it competes with the latest models like Grok 3 and Claude 3.7 Sonnet. In this blog, we will explore the features of GPT-4.5, its performance, how to access it, and even some hands-on applications. We will also see how it compares with other OpenAI models such as GPT-4o, o1, and o3-mini (high).',
    coverImage: process.env.PUBLIC_URL + '/images/blog-images/openai.png',
    category: 'LLM',
    author: {
      name: 'Anu Madan',
      avatar: process.env.PUBLIC_URL + '/images/instructors/analytics-vidhya.jpeg'
    },
    date: 'February 28, 2025',
    readTime: 8,
    tags: ['LLM', 'AI', 'ChatGPT'],
    externalLink: 'https://www.analyticsvidhya.com/blog/2025/02/openai-gpt-4-5/'
  },
  {
    id: 'how-llm-works',
    title: 'How Large Language Models work',
    excerpt: 'Thanks to Large Language Models (or LLMs for short), Artificial Intelligence has now caught the attention of pretty much everyone. ChatGPT, possibly the most famous LLM, has immediately skyrocketed in popularity due to the fact that natural language is such a, well, natural interface that has made the recent breakthroughs in Artificial Intelligence accessible to everyone. Nevertheless, how LLMs work is still less commonly understood, unless you are a Data Scientist or in another AI-related role.',
    coverImage: process.env.PUBLIC_URL + '/images/blog-images/how-llm-works.png',
    category: 'LLM',
    author: {
      name: 'Andreas Stöffelbauer',
      avatar: process.env.PUBLIC_URL + '/images/instructors/microsoft-llm.jpg'
    },
    date: 'October 24, 2024',
    readTime: 25,
    tags: ['LLM', 'AI', 'Deep Learning'],
    externalLink: 'https://medium.com/data-science-at-microsoft/how-large-language-models-work-91c362f5b78f'
  },
  {
    id: 'beginners-guide-ml',
    title: 'Beginner’s Guide to Machine Learning Concepts and Techniques',
    excerpt: 'Machine learning is changing how we use technology and data every day. This guide will explain the basics of machine learning, different types of algorithms, and how it’s used in fields like healthcare, banking, and retail. We’ll also clear up the confusion around terms like artificial intelligence and deep learning.',
    coverImage: process.env.PUBLIC_URL + '/images/blog-images/ml.jpg',
    category: 'ML',
    author: {
      name: 'Kunal Jain',
      avatar: process.env.PUBLIC_URL + '/images/instructors/analytics-vidhya.jpeg'
    },
    date: 'February 5, 2025',
    readTime: 9,
    tags: ['ML', 'AI', 'Deep Learning'],
    externalLink: 'https://www.analyticsvidhya.com/blog/2015/06/machine-learning-basics/'
  },
  {
    id: 'beginners-guide-ml',
    title: 'Beginner’s Guide to Machine Learning Concepts and Techniques',
    excerpt: 'Machine learning is changing how we use technology and data every day. This guide will explain the basics of machine learning, different types of algorithms, and how it’s used in fields like healthcare, banking, and retail. We’ll also clear up the confusion around terms like artificial intelligence and deep learning.',
    coverImage: process.env.PUBLIC_URL + '/images/blog-images/ml.jpg',
    category: 'ML',
    author: {
      name: 'Kunal Jain',
      avatar: process.env.PUBLIC_URL + '/images/instructors/analytics-vidhya.jpeg'
    },
    date: 'February 5, 2025',
    readTime: 9,
    tags: ['ML', 'AI', 'Deep Learning'],
    externalLink: 'https://www.analyticsvidhya.com/blog/2015/06/machine-learning-basics/'
  },
];

// Recent blogs for the homepage (just the first 4)
export const recentBlogs = blogPosts.slice(0, 4);

// Get a blog post by ID
export const getBlogById = (id) => {
  return blogPosts.find(post => post.id === id);
};

// Get blog posts by category
export const getBlogsByCategory = (category) => {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

// Get blog posts by tag
export const getBlogsByTag = (tag) => {
  return blogPosts.filter(post => post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
};