import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import AINewsSection from "../components/AINewsSection";
import RecentBlogs from "../components/RecentBlogs";
import ExploreTopics from "../components/ExploreTopics";

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
      {/* USC Logo and Title Section
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
      </section> */}

      {/* Hero Section - Updated Design */}
      <section style={styles.heroSection}>
        <div style={styles.heroBackground}>
          <div style={styles.heroContainer}>
            <div style={styles.heroBrainIcon}>
              {/* Brain Icon SVG */}
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M60 15C45.8579 15 34.3 26.4579 34.3 40.6C34.3 42.8 34.7 44.9 35.4 46.8C32.1 49.5 30 53.7 30 58.4C30 66.2 36.2 72.4 44 72.4C44.8 72.4 45.6 72.3 46.3 72.1C47.9 77.8 53.5 82 60 82C66.5 82 72.1 77.8 73.7 72.1C74.4 72.3 75.2 72.4 76 72.4C83.8 72.4 90 66.2 90 58.4C90 53.7 87.9 49.5 84.6 46.8C85.3 44.9 85.7 42.8 85.7 40.6C85.7 26.4579 74.1421 15 60 15Z"
                  fill="rgba(255, 255, 255, 0.9)"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                />
                <circle cx="49" cy="35" r="4" fill="#990000" />
                <circle cx="71" cy="35" r="4" fill="#990000" />
                <circle cx="54" cy="50" r="4" fill="#FFCC00" />
                <circle cx="66" cy="50" r="4" fill="#FFCC00" />
              </svg>
            </div>
            
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>
                AI & Academia:
                <br />
                <span style={styles.heroSubtitle}>Navigating the Revolution</span>
              </h1>
              
              <p style={styles.heroTagline}>
                For Students & Faculty: The Future is Now – Are You Ready?
              </p>
              
              <p style={styles.heroDescription}>
                Artificial Intelligence isn't just a buzzword; it's a transformative force reshaping every aspect of our world. At University AI Hub, we believe that understanding and strategically leveraging AI is no longer an option – it's a necessity for future success in every field.
              </p>
              
              <div style={styles.heroButtons}>
                {/* Option 1: Using Link components (Recommended) */}
                <Link 
                  to="/courses"
                  style={{...styles.heroBtn, ...styles.heroBtnStudent, textDecoration: 'none'}}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <span style={styles.btnIcon}>🎓</span>
                  Students: Start Your AI Journey
                  <span style={styles.btnArrow}>→</span>
                </Link>
                
                <Link 
                  to="/roadmaps"
                  style={{...styles.heroBtn, ...styles.heroBtnFaculty, textDecoration: 'none'}}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <span style={styles.btnIcon}>👨‍🏫</span>
                  Faculty: Transform Your Teaching
                  <span style={styles.btnArrow}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ExploreTopics />

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

const styles = {
  homePage: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  uscLogoSection: {
    padding: '20px 0',
    backgroundColor: '#f8f9fa',
  },
  uscLogoContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  uscLogoImage: {
    maxWidth: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  heroSection: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBackground: {
    background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3f73 50%, #0f2347 100%)',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  heroBrainIcon: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',
    animation: 'float 3s ease-in-out infinite',
  },
  heroContent: {
    color: 'white',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.1',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  heroSubtitle: {
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(255, 204, 0, 0.8))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '300',
  },
  heroTagline: {
    fontSize: '1.4rem',
    fontWeight: '500',
    marginBottom: '30px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
  },
  heroDescription: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginBottom: '50px',
    color: 'rgba(255, 255, 255, 0.85)',
    maxWidth: '800px',
    margin: '0 auto 50px auto',
  },
  heroButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heroBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '400px',
    padding: '18px 30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBtnStudent: {
    background: 'linear-gradient(45deg, #ffffff, #f8f9fa)',
    color: '#2c5aa0',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  heroBtnFaculty: {
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  btnIcon: {
    fontSize: '1.3rem',
    marginRight: '10px',
  },
  btnArrow: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease',
  },
};

// Add keyframe animation for floating effect
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @media (min-width: 768px) {
    .hero-buttons {
      flex-direction: row !important;
      justify-content: center;
      gap: 30px;
    }
    .hero-btn {
      max-width: 280px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Home;