// src/pages/About.jsx

import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <div className="about-subtitle">Learning AI, made simple and accessible</div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            AI for Students is a free educational platform dedicated to making artificial intelligence
            and programming education accessible to all students. We believe that AI literacy will be
            a fundamental skill in the future, and we're committed to providing high-quality learning
            resources without barriers.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <p>
            Our platform provides carefully structured roadmaps for learning AI and programming skills,
            breaking down complex concepts into manageable learning paths. We curate the best free resources
            from across the web, including:
          </p>
          <ul>
            <li>Comprehensive learning roadmaps for different skill paths</li>
            <li>Curated courses from top educational providers</li>
            <li>Latest news and developments in AI</li>
            <li>In-depth blog posts explaining complex concepts</li>
            <li>Project-based learning opportunities</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            AI for Students was created by a group of AI researchers, educators, and students at USC
            who are passionate about AI education. Our team combines expertise in machine learning,
            education, and user experience design to create the most effective learning platform possible.
          </p>
        </section>

        <section className="about-section">
          <h2>Join Our Community</h2>
          <p>
            Learning is better together. Join our growing community of students, educators, and AI
            enthusiasts to share knowledge, ask questions, and collaborate on projects.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-button">Contact Us</a>
            <a href="https://twitter.com/USC" target="_blank" rel="noopener noreferrer" className="cta-button secondary">Follow Us</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;