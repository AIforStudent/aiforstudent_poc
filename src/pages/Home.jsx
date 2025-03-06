// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Components
import BlogCard from '../components/BlogCard';
import RecentBlogs from '../components/RecentBlogs';
import AINewsSection from '../components/AINewsSection';
import RoadmapCard from '../components/RoadmapCard';

// Data - Make sure these imports match your file structure
import { aiRoadmaps } from '../data/roadmaps';
import { recentBlogs } from '../data/blogPosts';
import { aiNews } from '../data/aiNews';

const Home = () => {
  // Default empty arrays to prevent mapping errors
  const roadmaps = aiRoadmaps || [];
  const blogs = recentBlogs || [];
  const news = aiNews || [];

  return (
    <div className="home-page">
      {/* USC Logo and Title Section */}
      <section className="usc-logo-section">
        {/* <div className="container"> */}
          <div className="usc-logo-container">
            <img 
              // src="https://sites.usc.edu/improvinghealth/files/2024/03/cropped-Price-c9fe1aadacbfbc75.jpeg" 
              src='/images/home-page/usc-campus3.jpg' 
              alt="USC Logo"
              className="usc-logo-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=AI+Education+For+All';
                e.target.onerror = null;
              }}
            />
            {/* <h2 className="usc-logo-caption">USC AI Initiative</h2> */}
          </div>
        {/* </div> */}
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Why Everyone Should <span className="highlight">Learn AI</span>
            </h1>
            <p className="hero-description">
              In today's tech-driven world, Artificial Intelligence (AI) is revolutionizing industries across the board. 
              Yet, many undergraduates lack the crucial AI skills needed for tomorrow's job market. Our AI Cooperative 
              is here to change that. Empower yourself with our comprehensive resources, from trainings to insightful 
              issue briefs and articles.
            </p>
            <p className="hero-description">
              Learn how AI is going to impact your future and prepare for any career path with AI literacy – because 
              in the age of technology, knowledge is power. Our inclusive approach ensures that <strong>everyone</strong>, 
              regardless of background, major, or experience level, can engage with and benefit from AI education.
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
                e.target.src = '/images/home-page/usc-logo2.png';
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
      </section>

      {/* AI Learning Paths */}
      <section className="roadmaps-section">
        <div className="container">
          <div className="section-header">
            <h2>AI Learning Paths</h2>
            <Link to="/roadmaps" className="view-all">
              View All Resources
            </Link>
          </div>
          <div className="roadmaps-grid">
            {roadmaps.length > 0 ? (
              roadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} />
              ))
            ) : (
              <div className="roadmaps-placeholder">
                <div className="roadmap-card">
                  <div className="roadmap-content">
                    <h3>AI Learning Path for STEM Students</h3>
                    <p>Specialized AI training for students with technical backgrounds, covering machine learning algorithms, deep learning, and programming.</p>
                    <Link to="/roadmaps/stem" className="roadmap-link">Explore Path →</Link>
                  </div>
                </div>
                <div className="roadmap-card">
                  <div className="roadmap-content">
                    <h3>AI Learning Path for Non-STEM Students</h3>
                    <p>Accessible AI education for humanities, arts, and social science students, focusing on applications, ethics, and user experience.</p>
                    <Link to="/roadmaps/non-stem" className="roadmap-link">Explore Path →</Link>
                  </div>
                </div>
                <div className="roadmap-card">
                  <div className="roadmap-content">
                    <h3>AI Learning Path for Educational Institutes</h3>
                    <p>Resources for integrating AI education into institutional curricula, including guidance for departments and faculty.</p>
                    <Link to="/roadmaps/education" className="roadmap-link">Explore Path →</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      {blogs.length > 0 && <RecentBlogs blogs={blogs} />}

      {/* AI News Section */}
      {news.length > 0 && <AINewsSection news={news} />}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your AI Learning Journey Today</h2>
            <p>
              Join thousands of USC students who are already building their
              AI literacy skills and preparing for successful careers in the age of technology.
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