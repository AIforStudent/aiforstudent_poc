import React from "react";
import "../styles/BlogCard.css";

const BlogCard = ({ blog, featured }) => {
  // Helper function: Convert different date formats to a readable string.
  const formatDate = (date) => {
    let d;
    if (date && typeof date === "object" && date.$date) {
      d = new Date(date.$date);
    } else if (typeof date === "string") {
      d = new Date(date);
    } else {
      return "";
    }
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`blog-card ${featured ? "featured" : ""}`}>
      <a
        href={blog.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="blog-card-link"
      >
        <div className="blog-card-image">
          <img
            src={blog.coverImage}
            alt={blog.title}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                blog.title
              )}`;
              e.target.onerror = null;
            }}
          />
        </div>
        <div className="blog-card-content">
          <h3>{blog.title}</h3>
          <div className="blog-card-meta">
            <span className="blog-card-date">{formatDate(blog.date)}</span>
            <span className="blog-card-read-time">
              {blog.readTime} min read
            </span>
          </div>
          <p>{blog.excerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default BlogCard;
