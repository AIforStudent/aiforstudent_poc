import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import "../styles/RecentBlogs.css";

const RecentBlogs = ({ blogs = [] }) => {
  // Ensure blogs exists; if not, use an empty array
  const safeBlogs = blogs || [];

  // Select the featured blog and regular blogs (limit featured to the first and the next three for regular)
  const featuredBlog = safeBlogs.length > 0 ? safeBlogs[0] : null;
  const regularBlogs = safeBlogs.length > 1 ? safeBlogs.slice(1, 4) : [];

  if (safeBlogs.length === 0) {
    return null; // Do not render if there are no blogs
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
          {featuredBlog && (
            <BlogCard blog={featuredBlog} featured={true} key={featuredBlog.id || featuredBlog._id} />
          )}

          {regularBlogs.map((blog) => (
            <BlogCard key={blog.id || blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
