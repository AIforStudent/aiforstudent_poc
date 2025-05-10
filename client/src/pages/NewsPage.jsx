import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/NewsPage.css";
import { status } from "express/lib/response";

// Helper function to format the date
const formatDate = (date) => {
  if (typeof date === "string") {
    return date;
  }
  // Check if date has a $date property
  if (date && date.$date) {
    // If $date contains an object with $numberLong, parse it accordingly
    if (typeof date.$date === "object" && date.$date.$numberLong) {
      return new Date(parseInt(date.$date.$numberLong)).toLocaleDateString();
    } else if (typeof date.$date === "string") {
      return new Date(date.$date).toLocaleDateString();
    }
  }
  return "";
};

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from backend when component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/ai-news`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setNewsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading news...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-page">
      <h1 className="news-header">Latest News</h1>
      <p className="news-subtext">
        Be updated with what's new happening in the World of AI, 
        a one-stop destination for major AI updates.
      </p>

      <div className="news-container">
        {/* Left Side - News List */}
        <div className="news-list">
          {newsData.map((newsItem) => (
            <div key={newsItem._id} className="news-item">
              <img 
                src={newsItem.image} 
                alt={newsItem.title} 
                className="news-thumbnail" 
              />
              <h3 className="news-title">{newsItem.title}</h3>
              <p className="news-meta">
                By {newsItem.author || "Unknown"} • {formatDate(newsItem.date)}
              </p>
              <p className="news-summary">{newsItem.excerpt}</p>
              <Link to={newsItem.link} className="read-more-link">
                Read More
              </Link>
            </div>
          ))}
        </div>

        {/* Right Side - Recent News */}
        <div className="news-sidebar">
          <h3>Recent Posts</h3>
          <ul>
            {newsData.slice(0, 5).map((newsItem) => (
              <li key={newsItem._id}>
                <Link to={newsItem.link} className="recent-news-item">
                  {newsItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
