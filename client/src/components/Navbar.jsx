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
          <Link to="http://improvinghealth.usc.edu/">
            <img src="https://identity.usc.edu/wp-content/uploads/2022/09/FSeal_Mono_RegUse_Card-Blk_RGB.png" alt="USC Learning Portal" className="logo"/>
            <span className="site-name">USC Learning Portal</span>
          </Link>
        </div>

        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/blog" className="nav-link">Blogs</Link>
          <Link to="/Roadmaps" className="nav-link">Roadmaps</Link>
          <Link to="/latest-news" className="nav-link">News</Link> {/* ✅ Updated Route */}
          <Link to="/research-tool" className="nav-link">Scholar.AI Bot</Link>
        </div>

        <div className="nav-actions">
          {/* <button className="button secondary">Sign In</button> */}
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
            <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
            <Link to="/Roadmaps" className="nav-link" onClick={() => setIsMenuOpen(false)}>Roadmaps</Link>
            <Link to="/News" className="nav-link" onClick={() => setIsMenuOpen(false)}>News</Link>
            <Link to="/research-tool" className="nav-link" onClick={() => setIsMenuOpen(false)}>Scholar.AI Bot</Link>
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