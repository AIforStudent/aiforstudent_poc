import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import AINewsSection from "../components/AINewsSection";
import RecentBlogs from "../components/RecentBlogs";

const Home = () => {

  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  // Helper: Extract timestamp from a date field (handles both string and MongoDB date objects)
  const getTimestamp = (date) => {
    if (typeof date === "string") {
      return new Date(date).getTime();
    }
    if (date && date.$date) {
      if (typeof date.$date === "object" && date.$date.$numberLong) {
        return parseInt(date.$date.$numberLong);
      } else if (typeof date.$date === "string") {
        return new Date(date.$date).getTime();
      }
    }
    return 0;
  };

  // Fetch AI news from backend API
  useEffect(() => {
    // fetch("http://localhost:5001/api/ai-news")
    fetch(`https://aiforstudent-poc.onrender.com/api/ai-news/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Sort news items by date (most recent first)
        const sortedNews = data.sort(
          (a, b) => getTimestamp(b.date) - getTimestamp(a.date)
        );
        // Limit to the top 4 most recent articles
        const limitedNews = sortedNews.slice(0, 4);
        setNews(limitedNews);
        setLoadingNews(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setNewsError(error.message);
        setLoadingNews(false);
      });
  }, []);

  return (
    <div className="home-page">
      {/* USC Logo and Title Section */}
      <section className="usc-logo-section">
        <div className="usc-logo-container">
          <img
            src="/images/home-page/usc-campus3.jpg"
            alt="USC Logo"
            className="usc-logo-image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400?text=AI+Education+For+All";
              e.target.onerror = null;
            }}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Why Everyone Should <span className="highlight">Learn AI</span>
            </h1>
            <p className="hero-description">
              In today's tech-driven world, Artificial Intelligence (AI) is
              revolutionizing industries across the board. Yet, many
              undergraduates lack the crucial AI skills needed for tomorrow's
              job market. Our AI Cooperative is here to change that. Empower
              yourself with our comprehensive resources, from trainings to
              insightful issue briefs and articles.
            </p>
            <p className="hero-description">
              Learn how AI is going to impact your future and prepare for any
              career path with AI literacy – because in the age of technology,
              knowledge is power. Our inclusive approach ensures that{" "}
              <strong>everyone</strong>, regardless of background, major, or
              experience level, can engage with and benefit from AI education.
            </p>
            <div className="hero-actions">
              <Link to="/roadmaps" className="button">
                Explore Learning Paths
              </Link>
              <Link to="/blog" className="button secondary">
                Read Articles
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">3</span>
                <span className="stat-label">Learning Paths</span>
              </div>
              <div className="stat">
                <span className="stat-value">15+</span>
                <span className="stat-label">Resources</span>
              </div>
              <div className="stat">
                <span className="stat-value">All</span>
                <span className="stat-label">Backgrounds</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/ai-learning.jpg"
              alt="Students Learning AI"
              onError={(e) => {
                e.target.src = "/images/home-page/usc-logo2.png";
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
      </section>


      {/* AI News Section */}
      {loadingNews ? (
        <div>Loading news...</div>
      ) : newsError ? (
        <div>Error loading news: {newsError}</div>
      ) : (
        news.length > 0 && <AINewsSection news={news} />
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your AI Learning Journey Today</h2>
            <p>
              Join thousands of USC students who are already building their
              AI literacy skills and preparing for successful careers in the age
              of technology.
            </p>
            <Link to="/roadmaps" className="button">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
