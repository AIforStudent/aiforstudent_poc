// src/components/Footer.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        // const res = await fetch('http://127.0.0.1:5001/api/roadmaps');
        const res = await fetch('https://aiforstudent-poc.onrender.com/api/roadmaps/');
        if (!res.ok) {
          throw new Error('Failed to fetch roadmaps');
        }
        const data = await res.json();
        setRoadmaps(data.slice(0, 5)); // Get only first 5 roadmaps for footer
      } catch (err) {
        console.error('Error fetching roadmaps for footer:', err);
      }
    }
    fetchRoadmaps();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/home-page/usc-logo.png" alt="AI for Students" className="footer-logo" />
            <h3>AI for Students</h3>
            <p>
              Free learning paths and resources to help students master programming, AI, 
              and other tech skills with carefully curated content.
            </p>
            <div className="social-links">
              <a href="https://twitter.com/USC" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-globe fa-lg"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Learning Roadmaps</h4>
            <ul>
              {roadmaps.length > 0 ? (
                roadmaps.map(roadmap => (
                  <li key={roadmap.id}>
                    <Link to={`/roadmaps/${roadmap.id}`}>{roadmap.title}</Link>
                  </li>
                ))
              ) : (
                <li><Link to="/roadmaps">Browse All Roadmaps</Link></li>
              )}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/news">AI News</Link></li>
              <li><Link to="/courses">Courses</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>About</h4>
            <ul>
              <li><Link to="/about">About This Project</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} AI for Students - A Free Educational Resource</p>
          <p>
            Open-source project created to help students learn programming and AI.
            All learning content is freely available for anyone's use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;