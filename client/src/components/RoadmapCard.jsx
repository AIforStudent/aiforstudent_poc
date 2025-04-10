// src/components/RoadmapCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoadmapCard.css';

const RoadmapCard = ({ roadmap }) => {
  if (!roadmap) return null;

  const { id, title, description, image, audience, resources, difficulty } = roadmap;

  return (
    <div className="roadmap-card">
      {image && (
        <div className="roadmap-image">
          <img
            src={image}
            alt={title}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x225?text=${encodeURIComponent(title)}`;
              e.target.onerror = null;
            }}
          />
        </div>
      )}
      <div className="roadmap-content">
        <div className="roadmap-audience">
          <span className="audience-label">For {audience}</span>
        </div>
        <h3 className="roadmap-title">
          <Link to={`/roadmaps/${id}`}>{title}</Link>
        </h3>
        {description && <p className="roadmap-description">{description}</p>}
        <div className="roadmap-meta">
          {resources && (
            <div className="meta-item">
              <span className="meta-icon">📚</span>
              <span>{resources} resources</span>
            </div>
          )}
          {difficulty && (
            <div className="meta-item">
              <span className="meta-icon">🏆</span>
              <span>{difficulty}</span>
            </div>
          )}
        </div>
        <Link to={`/roadmaps/${id}`} className="roadmap-link">
          Explore Path →
        </Link>
      </div>
    </div>
  );
};

export default RoadmapCard;