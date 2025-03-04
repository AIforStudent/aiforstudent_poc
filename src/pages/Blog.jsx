import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import '../styles/Blog.css';

// Import blog data
import { blogPosts, recentBlogs } from '../data/blogPosts';

const Blog = () => {
  // Use all blog posts or recentBlogs as fallback
  const allBlogs = blogPosts || recentBlogs || [];
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState(null);
  
  // Extract all unique categories and tags from blog posts
  const categories = ['all', ...new Set(allBlogs.map(blog => blog.category))];
  
  const allTags = allBlogs.reduce((tags, blog) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach(tag => tags.add(tag));
    }
    return tags;
  }, new Set());
  
  const tags = Array.from(allTags);
  
  // Filter blog posts based on active category and tag
  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
    const matchesTag = !activeTag || (blog.tags && blog.tags.includes(activeTag));
    return matchesCategory && matchesTag;
  });
  
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
          {activeCategory !== 'all' && (
            <div className="active-filter">
              <span>Category: {activeCategory}</span>
              <button 
                className="clear-filter"
                onClick={() => setActiveCategory('all')}
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
          
          {(activeCategory !== 'all' || activeTag) && (
            <button 
              className="clear-all-filters"
              onClick={() => {
                setActiveCategory('all');
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
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="no-results">
              <h3>No blog posts found</h3>
              <p>Try adjusting your filters to find what you're looking for.</p>
              <button 
                className="button"
                onClick={() => {
                  setActiveCategory('all');
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