// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={`navbar ${isHomePage ? 'navbar-home' : 'navbar-other'}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="">
            <img src="https://identity.usc.edu/wp-content/uploads/2022/09/FSeal_Mono_RegUse_Card-Blk_RGB.png" alt="USC Learning Portal" className="logo"/>
            <span className="site-name">University AI Hub</span>
          </Link>
        </div>
        
        <div className="desktop-menu">
          <div className="dropdown-container">
            <button 
              className="nav-link dropdown-trigger" 
              onClick={() => handleDropdownToggle('students')}
            >
              Students
              <span className={`dropdown-arrow ${activeDropdown === 'students' ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'students' ? 'open' : ''}`}>
              <Link to="/courses" className="dropdown-link" onClick={closeDropdown}>Courses</Link>
              <Link to="/Roadmaps" className="dropdown-link" onClick={closeDropdown}>Roadmaps</Link>
              <Link to="/blog" className="dropdown-link" onClick={closeDropdown}>Blogs</Link>
              <Link to="/research-tool" className="dropdown-link" onClick={closeDropdown}>Scholar.AI Bot</Link>
            </div>
          </div>

          <div className="dropdown-container">
            <button 
              className="nav-link dropdown-trigger" 
              onClick={() => handleDropdownToggle('faculty')}
            >
              Faculty
              <span className={`dropdown-arrow ${activeDropdown === 'faculty' ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'faculty' ? 'open' : ''}`}>
              <Link to="/courses" className="dropdown-link" onClick={closeDropdown}>Courses</Link>
              <Link to="/Roadmaps" className="dropdown-link" onClick={closeDropdown}>Roadmaps</Link>
              <Link to="/blog" className="dropdown-link" onClick={closeDropdown}>Blogs</Link>
              <Link to="/research-tool" className="dropdown-link" onClick={closeDropdown}>Scholar.AI Bot</Link>
            </div>
          </div>

          <div className="dropdown-container">
            <button 
              className="nav-link dropdown-trigger" 
              onClick={() => handleDropdownToggle('resources')}
            >
              Resources
              <span className={`dropdown-arrow ${activeDropdown === 'resources' ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'resources' ? 'open' : ''}`}>
              <Link to="/courses" className="dropdown-link" onClick={closeDropdown}>Courses</Link>
              <Link to="/Roadmaps" className="dropdown-link" onClick={closeDropdown}>Roadmaps</Link>
              <Link to="/blog" className="dropdown-link" onClick={closeDropdown}>Blogs</Link>
              <Link to="/research-tool" className="dropdown-link" onClick={closeDropdown}>Scholar.AI Bot</Link>
            </div>
          </div>

          <Link to="/latest-news" className="nav-link">News</Link>
        </div>

        <div className="nav-actions">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <img src="https://identity.usc.edu/wp-content/uploads/2022/09/FSeal_Mono_RegUse_Card-Blk_RGB.png" alt="USC Learning Portal" className="logo" />
              <span className="site-name">University AI Hub</span>
            </Link>
            <button className="close-menu" onClick={toggleMenu}>×</button>
          </div>
          <div className="mobile-menu-content">
            <div className="mobile-dropdown">
              <button className="mobile-dropdown-trigger" onClick={() => handleDropdownToggle('mobile-students')}>
                Students
              </button>
              <div className={`mobile-dropdown-content ${activeDropdown === 'mobile-students' ? 'open' : ''}`}>
                <Link to="/courses" className="nav-link" onClick={() => setIsMenuOpen(false)}>Courses</Link>
                <Link to="/Roadmaps" className="nav-link" onClick={() => setIsMenuOpen(false)}>Roadmaps</Link>
                <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                <Link to="/research-tool" className="nav-link" onClick={() => setIsMenuOpen(false)}>Scholar.AI Bot</Link>
              </div>
            </div>
            
            <div className="mobile-dropdown">
              <button className="mobile-dropdown-trigger" onClick={() => handleDropdownToggle('mobile-faculty')}>
                Faculty
              </button>
              <div className={`mobile-dropdown-content ${activeDropdown === 'mobile-faculty' ? 'open' : ''}`}>
                <Link to="/courses" className="nav-link" onClick={() => setIsMenuOpen(false)}>Courses</Link>
                <Link to="/Roadmaps" className="nav-link" onClick={() => setIsMenuOpen(false)}>Roadmaps</Link>
                <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                <Link to="/research-tool" className="nav-link" onClick={() => setIsMenuOpen(false)}>Scholar.AI Bot</Link>
              </div>
            </div>

            <div className="mobile-dropdown">
              <button className="mobile-dropdown-trigger" onClick={() => handleDropdownToggle('mobile-resources')}>
                Resources
              </button>
              <div className={`mobile-dropdown-content ${activeDropdown === 'mobile-resources' ? 'open' : ''}`}>
                <Link to="/courses" className="nav-link" onClick={() => setIsMenuOpen(false)}>Courses</Link>
                <Link to="/Roadmaps" className="nav-link" onClick={() => setIsMenuOpen(false)}>Roadmaps</Link>
                <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                <Link to="/research-tool" className="nav-link" onClick={() => setIsMenuOpen(false)}>Scholar.AI Bot</Link>
              </div>
            </div>

            <Link to="/latest-news" className="nav-link" onClick={() => setIsMenuOpen(false)}>News</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;