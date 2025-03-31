import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ blog, featured = false }) => {
  if (!blog) return null;
  
  const { id, title, excerpt, coverImage, category, author, date, readTime, tags = [], externalLink } = blog;

  // Determine the link type
  const isExternal = Boolean(externalLink);
  const BlogLink = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { href: externalLink, target: '_blank', rel: 'noopener noreferrer' }
    : { to: `/blog/${id}` };

  return (
    <BlogLink {...linkProps} className={`blog-card ${featured ? 'featured' : ''}`}>
      <div className="blog-thumbnail">
        <img 
          src={coverImage} 
          alt={title}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x225?text=${encodeURIComponent(title)}`;
            e.target.onerror = null;
          }} 
        />
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          {category && (
            <BlogLink {...(isExternal ? { href: externalLink } : { to: `/blog/category/${category.toLowerCase()}` })} className="blog-category">
              {category}
            </BlogLink>
          )}
          {date && <span className="blog-date">{date}</span>}
          {readTime && <span className="blog-read-time">{readTime} min read</span>}
        </div>
        <h3 className="blog-title">
          <BlogLink {...linkProps}>{title}</BlogLink>
        </h3>
        {excerpt && <p className="blog-excerpt">{excerpt}</p>}
        
        {tags.length > 0 && (
          <div className="blog-tags">
            {tags.map((tag, index) => (
              <Link key={index} to={`/blog/tag/${tag.toLowerCase()}`} className="blog-tag">
                #{tag}
              </Link>
            ))}
          </div>
        )}
        
        {author && (
          <div className="blog-author">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="author-avatar"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/32x32?text=${encodeURIComponent(author.name.charAt(0))}`;
                e.target.onerror = null;
              }}  
            />
            <span className="author-name">{author.name}</span>
          </div>
        )}
      </div>
    </BlogLink>
  );
};

export default BlogCard;