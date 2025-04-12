// src/pages/AboutProject.jsx

import React from 'react';
import '../styles/Legal.css';

const AboutProject = () => {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>About This Project</h1>
        <div className="about-subtitle">The story behind AI for Students</div>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>Project Origins</h2>
          <p>
            AI for Students began as a collaborative initiative at the University of Southern California (USC)
            to address the growing need for accessible, high-quality educational resources in artificial intelligence
            and programming. Recognizing that AI literacy will be crucial for future generations, our team of
            educators, researchers, and students set out to create a platform that democratizes AI education.
          </p>
        </section>

        <section className="legal-section">
          <h2>Our Approach</h2>
          <p>
            Rather than creating all content from scratch, we take a curatorial approach. We carefully
            select the best free resources available across the web, organize them into coherent learning paths,
            and supplement them with guidance, context, and additional materials where needed. This allows us to:
          </p>
          <ul>
            <li>Leverage existing high-quality content from universities, tech companies, and educational platforms</li>
            <li>Create structured learning roadmaps that guide students from beginner to advanced levels</li>
            <li>Focus our efforts on addressing gaps in the existing educational ecosystem</li>
            <li>Continuously update our recommendations as new resources become available</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Technology Stack</h2>
          <p>
            AI for Students is built using modern web technologies:
          </p>
          <ul>
            <li><strong>Frontend:</strong> React.js with responsive design principles to ensure accessibility across devices</li>
            <li><strong>Backend:</strong> Python with Flask for efficient API development and data processing</li>
            <li><strong>Database:</strong> MongoDB for flexible data storage of courses, roadmaps, and user information</li>
            <li><strong>AI Integration:</strong> We use various AI tools and APIs to help personalize learning experiences</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Funding and Support</h2>
          <p>
            This project is funded through educational grants from USC and contributions from industry partners
            who share our vision of making AI education accessible to all. We operate as a non-commercial
            educational initiative, allowing us to keep all content free and open to everyone.
          </p>
        </section>

        <section className="legal-section">
          <h2>Future Direction</h2>
          <p>
            Moving forward, we plan to:
          </p>
          <ul>
            <li>Expand our coverage of AI topics, particularly in emerging areas like responsible AI and generative models</li>
            <li>Develop interactive learning tools to complement our curated content</li>
            <li>Build community features to facilitate peer learning and discussion</li>
            <li>Partner with more educational institutions to broaden our impact</li>
            <li>Create assessment tools to help learners track their progress</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Get Involved</h2>
          <p>
            We welcome contributions from educators, AI practitioners, students, and anyone passionate about AI education.
            Whether you want to suggest resources, help improve our platform, or provide feedback, we'd love to hear from you.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-button">Contact Us</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutProject;