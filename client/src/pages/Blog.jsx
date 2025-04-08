import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import '../styles/Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs from the backend
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('http://127.0.0.1:5001/api/blogs');
        if (!res.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Use fetched blogs as the source of data
  const allBlogs = blogs;

  // Extract unique categories
  const categories = ['All', ...new Set(allBlogs.map(blog => blog.category))];

  // Extract all unique tags from the blog posts
  const allTags = allBlogs.reduce((tags, blog) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach(tag => tags.add(tag));
    }
    return tags;
  }, new Set());

  const tags = Array.from(allTags);

  // Filter blog posts based on the active category and tag
  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesTag = !activeTag || (blog.tags && blog.tags.includes(activeTag));
    return matchesCategory && matchesTag;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="container">
          <h1>USC Learning Portal Blog</h1>
          <p>Tutorials, insights, and updates for USC students learning web development and AI</p>
        </div>
      </div>

      <div className="container">
        <div className="blog-filters">
          <div className="categories-filter">
            <h3>Categories</h3>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveTag(null);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {tags.length > 0 && (
            <div className="tags-filter">
              <h3>Popular Tags</h3>
              <div className="filter-tags">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`filter-tag ${activeTag === tag ? 'active' : ''}`}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="filter-summary">
          {activeCategory !== 'All' && (
            <div className="active-filter">
              <span>Category: {activeCategory}</span>
              <button 
                className="clear-filter"
                onClick={() => setActiveCategory('All')}
              >
                ×
              </button>
            </div>
          )}

          {activeTag && (
            <div className="active-filter">
              <span>Tag: #{activeTag}</span>
              <button 
                className="clear-filter"
                onClick={() => setActiveTag(null)}
              >
                ×
              </button>
            </div>
          )}

          {(activeCategory !== 'All' || activeTag) && (
            <button 
              className="clear-all-filters"
              onClick={() => {
                setActiveCategory('All');
                setActiveTag(null);
              }}
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="blogs-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              // Note: adjust blog.id or blog._id based on your backend response
              <BlogCard key={blog.id || blog._id} blog={blog} />
            ))
          ) : (
            <div className="no-results">
              <h3>No blog posts found</h3>
              <p>Try adjusting your filters to find what you're looking for.</p>
              <button 
                className="button"
                onClick={() => {
                  setActiveCategory('All');
                  setActiveTag(null);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
