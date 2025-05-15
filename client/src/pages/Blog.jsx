// src/pages/blog.jsx
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import ArticleCard from '../components/ArticleCard';
import '../styles/Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs (videos + articles) from the backend
  useEffect(() => {
    async function fetchBlogs() {
      try {
        // const res = await fetch('http://127.0.0.1:5001/api/blogs');
        const res = await fetch('https://aiforstudent-poc.onrender.com/api/blogs/');
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Split into videos vs articles by presence of video_length
  const allBlogs     = blogs;
  const videoBlogs   = allBlogs.filter(b => 
    typeof b.externalLink === 'string' &&
    (b.externalLink.includes('youtube.com') || b.externalLink.includes('youtu.be'))
  );
  const articleBlogs = allBlogs.filter(b => 
    !(b.externalLink.includes('youtube.com') || b.externalLink.includes('youtu.be'))
  );

  // Build category & tag filters
  const categories = ['All', ...new Set(allBlogs.map(b => b.category))];
  const allTags = allBlogs.reduce((set, b) => {
    if (Array.isArray(b.tags)) b.tags.forEach(t => set.add(t));
    return set;
  }, new Set());
  const tags = Array.from(allTags);

  // Apply active category/tag to each list
  const filteredVideos = videoBlogs.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchTag = !activeTag || (b.tags && b.tags.includes(activeTag));
    return matchCat && matchTag;
  });
  const filteredArticles = articleBlogs.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchTag = !activeTag || (b.tags && b.tags.includes(activeTag));
    return matchCat && matchTag;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
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
        {/* Filters */}
        <div className="blog-filters">
          <div className="categories-filter">
            <h3>Categories</h3>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-button ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveTag(null);
                  }}
                >
                  {cat}
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

        {/* Active filter summary */}
        <div className="filter-summary">
          {activeCategory !== 'All' && (
            <div className="active-filter">
              <span>Category: {activeCategory}</span>
              <button className="clear-filter" onClick={() => setActiveCategory('All')}>
                ×
              </button>
            </div>
          )}
          {activeTag && (
            <div className="active-filter">
              <span>Tag: #{activeTag}</span>
              <button className="clear-filter" onClick={() => setActiveTag(null)}>
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

        {/* Videos Section */}
        <h2 className="section-title">Youtube Videos</h2>
        <div className="blogs-grid">
          {filteredVideos.length > 0 ? (
            filteredVideos.map(video => (
              <BlogCard key={video.id || video._id} blog={video} />
            ))
          ) : (
            <p>No videos found under these filters.</p>
          )}
        </div>

        {/* Articles Section */}
        <h2 className="section-title">Blogs and Articles</h2>
        <div className="articles-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <ArticleCard key={article.id || article._id} article={article} />
            ))
          ) : (
            <p>No articles found under these filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;