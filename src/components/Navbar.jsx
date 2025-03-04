// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/images/logo.png" alt="USC Learning Portal" className="logo" />
            <span className="site-name">USC Learning Portal</span>
          </Link>
        </div>

        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/topics" className="nav-link">Topics</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
        </div>

        <div className="nav-actions">
          <button className="button secondary">Sign In</button>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <img src="/images/logo.png" alt="USC Learning Portal" className="logo" />
              <span className="site-name">USC Learning Portal</span>
            </Link>
            <button className="close-menu" onClick={toggleMenu}>×</button>
          </div>
          <div className="mobile-menu-content">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/courses" className="nav-link" onClick={() => setIsMenuOpen(false)}>Courses</Link>
            <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/topics" className="nav-link" onClick={() => setIsMenuOpen(false)}>Topics</Link>
            <Link to="/projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <div className="mobile-menu-footer">
              <button className="button">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;