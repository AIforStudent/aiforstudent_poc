import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AINewsSection.css';

// Helper function to format the date
const formatDate = (date) => {
  if (typeof date === "string") {
    return date;
  }
  if (date && date.$date) {
    if (typeof date.$date === "object" && date.$date.$numberLong) {
      return new Date(parseInt(date.$date.$numberLong)).toLocaleDateString();
    } else if (typeof date.$date === "string") {
      return new Date(date.$date).toLocaleDateString();
    }
  }
  return "";
};

const AINewsSection = ({ news = [] }) => {
  const safeNews = news || [];

  if (safeNews.length === 0) {
    return null;
  }

  return (
    <section className="ai-news-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest in AI &amp; Tech</h2>
          <Link to="/latest-news" className="view-all">
            View All AI Latest Updates
          </Link>
        </div>

        <div className="news-grid">
          {safeNews.map((item, index) => (
            <div key={index} className="news-card">
              <div className="news-content">
                <span className="news-date">{formatDate(item.date)}</span>
                <h3 className="news-title">
                  <Link to={item.link}>{item.title}</Link>
                </h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-source">
                  <span className="source-name">{item.source}</span>
                  {item.author && (
                    <span className="news-author">by {item.author}</span>
                  )}
                </div>
              </div>
              {item.image && (
                <div className="news-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(item.title)}`;
                      e.target.onerror = null;
                    }}  
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AINewsSection;
