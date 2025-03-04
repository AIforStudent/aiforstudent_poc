import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import '../styles/RecentBlogs.css';

const RecentBlogs = ({ blogs = [] }) => {
  // Make sure blogs exists, if not, provide an empty array
  const safeBlogs = blogs || [];
  
  // Only try to get featured blog if there are any blogs
  const featuredBlog = safeBlogs.length > 0 ? safeBlogs[0] : null;
  const regularBlogs = safeBlogs.length > 1 ? safeBlogs.slice(1, 4) : [];

  if (safeBlogs.length === 0) {
    return null; // Don't render anything if there are no blogs
  }

  return (
    <section className="recent-blogs-section">
      <div className="container">
        <div className="section-header">
          <h2>Recent Articles</h2>
          <Link to="/blog" className="view-all">
            View All Articles
          </Link>
        </div>

        <div className="blogs-grid">
          {featuredBlog && <BlogCard blog={featuredBlog} featured={true} />}
          
          {regularBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;