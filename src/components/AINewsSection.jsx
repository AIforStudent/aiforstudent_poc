import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AINewsSection.css';

const AINewsSection = ({ news = [] }) => {
  // Make sure news exists, if not, provide an empty array
  const safeNews = news || [];

  if (safeNews.length === 0) {
    return null; // Don't render anything if there is no news
  }

  return (
    <section className="ai-news-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest in AI & Tech</h2>
          <Link to="/latest-news" className="view-all">
            View All AI Latest Updates
          </Link>
        </div>

        <div className="news-grid">
          {safeNews.map((item, index) => (
            <div key={index} className="news-card">
              <div className="news-content">
                <span className="news-date">{item.date}</span>
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