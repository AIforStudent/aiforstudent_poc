// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="USC Learning Portal" className="footer-logo" />
            <h3>USC Learning Portal</h3>
            <p>
              Level up your coding skills with our comprehensive learning paths,
              designed specifically for USC students.
            </p>
            <div className="social-links">
              <a href="https://twitter.com/usc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com/usc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/usc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/school/university-of-southern-california" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/usc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Learning Paths</h4>
            <ul>
              <li><Link to="/courses/frontend-developer">Frontend Developer</Link></li>
              <li><Link to="/courses/ai-engineer">AI Engineer</Link></li>
              <li><Link to="/courses/full-stack">Full Stack Developer</Link></li>
              <li><Link to="/courses/data-science">Data Science</Link></li>
              <li><Link to="/courses/cybersecurity">Cybersecurity</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} USC Learning Portal. All rights reserved.</p>
          <p>
            A project for University of Southern California students. 
            Not affiliated with or endorsed by Scrimba, Mozilla MDN, or other platforms.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;