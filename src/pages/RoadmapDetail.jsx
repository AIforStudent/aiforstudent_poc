// src/pages/RoadmapDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/RoadmapDetail.css';

// Data
import { getAiRoadmapById } from '../data/roadmaps';

const RoadmapDetail = () => {
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const roadmapData = getAiRoadmapById(roadmapId);
    setRoadmap(roadmapData);
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [roadmapId]);

  if (!roadmap) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading roadmap...</p>
      </div>
    );
  }

  return (
    <div className="roadmap-detail-page">
      {/* Roadmap Header */}
      <header className="roadmap-header">
        <div className="container">
          <Link to="/" className="back-link">← Back to Home</Link>
          
          <div className="roadmap-audience-badge">
            For {roadmap.audience}
          </div>
          <h1>{roadmap.title}</h1>
          <p className="roadmap-description">{roadmap.description}</p>
          
          <div className="roadmap-meta-info">
            <div className="meta-item">
              <span className="meta-icon">📚</span>
              <span>{roadmap.resources} resources</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🏆</span>
              <span>{roadmap.difficulty} level</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📝</span>
              <span>{roadmap.topics ? roadmap.topics.length : 0} topics</span>
            </div>
          </div>
          
          <div className="roadmap-actions">
            <button className="button">Start Learning</button>
            <button className="button secondary">Download Resources</button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Roadmap Introduction */}
        <section className="roadmap-intro">
          <div className="roadmap-intro-content">
            <h2>Learning Path Overview</h2>
            <p>
              This learning path is designed specifically for {roadmap.audience.toLowerCase()}, 
              providing a structured approach to developing AI literacy and skills relevant to your background and goals.
            </p>
            <p>
              By following this curriculum, you'll build a solid foundation in AI concepts, applications, and implications
              that will enhance your academic experience and prepare you for future career opportunities.
            </p>
          </div>
          {roadmap.image && (
            <div className="roadmap-intro-image">
              <img 
                src={roadmap.image} 
                alt={roadmap.title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(roadmap.title)}`;
                  e.target.onerror = null;
                }}
              />
            </div>
          )}
        </section>

        {/* Topics List */}
        <section className="roadmap-topics">
          <h2>Learning Topics</h2>
          
          {roadmap.topics && roadmap.topics.length > 0 ? (
            <div className="topics-list">
              {roadmap.topics.map((topic, index) => (
                <div key={index} className="topic-card">
                  <div className="topic-header">
                    <div className="topic-number">{index + 1}</div>
                    <h3 className="topic-title">{topic.name}</h3>
                  </div>
                  <p className="topic-description">{topic.description}</p>
                  <div className="topic-meta">
                    <span className="modules-count">
                      <span className="meta-icon">📘</span> {topic.modules} modules
                    </span>
                    <Link to={`/roadmaps/${roadmapId}/topics/${index}`} className="explore-topic">
                      Explore Topic →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-topics">
              <p>Topics for this roadmap are currently being developed.</p>
              <p>Check back soon for updates!</p>
            </div>
          )}
        </section>

        {/* Success Stories */}
        <section className="success-stories">
          <h2>Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-content">
                <p className="story-quote">
                  "As an English major, I never thought AI would be relevant to my studies. This learning path showed me how AI can enhance literary analysis and opened up exciting new career paths."
                </p>
                <div className="story-author">
                  <img 
                    src="/images/students/maria.jpg" 
                    alt="Maria" 
                    className="author-avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60?text=M';
                      e.target.onerror = null;
                    }}
                  />
                  <div className="author-info">
                    <span className="author-name">Maria L.</span>
                    <span className="author-details">English Literature, Class of 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="story-card">
              <div className="story-content">
                <p className="story-quote">
                  "The personalized approach to AI education made all the difference. I was able to apply AI concepts directly to my research in sociology."
                </p>
                <div className="story-author">
                  <img 
                    src="/images/students/jason.jpg" 
                    alt="Jason" 
                    className="author-avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60?text=J';
                      e.target.onerror = null;
                    }}
                  />
                  <div className="author-info">
                    <span className="author-name">Jason K.</span>
                    <span className="author-details">Sociology, Class of 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="story-card">
              <div className="story-content">
                <p className="story-quote">
                  "I appreciated that this learning path acknowledged different backgrounds and learning styles. I never felt left behind despite having no prior technical experience."
                </p>
                <div className="story-author">
                  <img 
                    src="/images/students/taylor.jpg" 
                    alt="Taylor" 
                    className="author-avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60?text=T';
                      e.target.onerror = null;
                    }}
                  />
                  <div className="author-info">
                    <span className="author-name">Taylor P.</span>
                    <span className="author-details">Business Administration, Class of 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="roadmap-cta">
          <div className="cta-content">
            <h2>Ready to Begin Your AI Journey?</h2>
            <p>Join thousands of USC students who are building AI literacy skills for the future.</p>
            <button className="button">Enroll Now</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoadmapDetail;