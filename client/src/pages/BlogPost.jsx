import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/BlogPost.css';

// Import blog data
import { getBlogById, recentBlogs } from '../data/blogPosts';

const BlogPost = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const blogData = getBlogById(blogId);
    setBlog(blogData);
    
    // Find related posts (same category or common tags)
    if (blogData && recentBlogs) {
      const related = recentBlogs.filter(post => {
        if (post.id === blogId) return false; // Exclude current post
        
        // Same category
        if (post.category === blogData.category) return true;
        
        // Common tags
        if (blogData.tags && post.tags) {
          const commonTags = blogData.tags.filter(tag => post.tags.includes(tag));
          if (commonTags.length > 0) return true;
        }
        
        return false;
      }).slice(0, 3); // Limit to 3 related posts
      
      setRelatedPosts(related);
    }
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [blogId]);
  
  if (!blog) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }
  
  return (
    <div className="blog-post-page">
      <div className="blog-post-header">
        <div className="container">
          <Link to="/blog" className="back-link">← Back to Blog</Link>
          
          <div className="blog-meta">
            <Link to={`/blog/category/${blog.category.toLowerCase()}`} className="blog-category">
              {blog.category}
            </Link>
            <span className="blog-date">{blog.date}</span>
            <span className="blog-read-time">{blog.readTime} min read</span>
          </div>
          
          <h1>{blog.title}</h1>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((tag, index) => (
                <Link key={index} to={`/blog/tag/${tag.toLowerCase()}`} className="blog-tag">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          
          <div className="blog-author">
            <img 
              src={blog.author.avatar} 
              alt={blog.author.name} 
              className="author-avatar" 
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/64x64?text=${encodeURIComponent(blog.author.name.charAt(0))}`;
                e.target.onerror = null;
              }}
            />
            <div className="author-info">
              <span className="author-name">{blog.author.name}</span>
              {blog.author.title && <span className="author-title">{blog.author.title}</span>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="blog-post-feature-image">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/1200x600?text=${encodeURIComponent(blog.title)}`;
            e.target.onerror = null;
          }}
        />
      </div>
      
      <div className="blog-post-content container">
        <div className="blog-post-layout">
          <div className="blog-post-main">
            <div className="blog-body">
              {/* If content is HTML string */}
              {typeof blog.content === 'string' && (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              )}
              
              {/* If content is not provided, show a placeholder */}
              {!blog.content && (
                <div>
                  <h2>Introduction</h2>
                  <p>This is a placeholder for the blog content. In a real application, this would contain the full article text.</p>
                  
                  <h2>Main Points</h2>
                  <ul>
                    <li>First important point about {blog.title}</li>
                    <li>Second important consideration for USC students</li>
                    <li>How this topic relates to modern web development</li>
                    <li>Practical applications and examples</li>
                  </ul>
                  
                  <h2>Conclusion</h2>
                  <p>Summary of key takeaways and next steps for readers interested in {blog.category}.</p>
                </div>
              )}
            </div>
            
            <div className="blog-share">
              <span>Share this article:</span>
              <div className="share-buttons">
                <button className="share-button twitter">Twitter</button>
                <button className="share-button facebook">Facebook</button>
                <button className="share-button linkedin">LinkedIn</button>
                <button className="share-button copy">Copy Link</button>
              </div>
            </div>
          </div>
          
          <div className="blog-post-sidebar">
            <div className="sidebar-section table-of-contents">
              <h3>Table of Contents</h3>
              <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#main-points">Main Points</a></li>
                <li><a href="#conclusion">Conclusion</a></li>
              </ul>
            </div>
            
            {relatedPosts.length > 0 && (
              <div className="sidebar-section related-posts">
                <h3>Related Articles</h3>
                <ul>
                  {relatedPosts.map((post, index) => (
                    <li key={index}>
                      <Link to={`/blog/${post.id}`} className="related-post">
                        <div className="related-post-image">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/100x60?text=${encodeURIComponent(post.title)}`;
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                        <div className="related-post-info">
                          <h4>{post.title}</h4>
                          <span>{post.date}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;