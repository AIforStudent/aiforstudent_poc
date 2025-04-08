// src/pages/Roadmaps.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Roadmaps.css';

// Import roadmap data
import { aiRoadmaps } from '../data/roadmaps';

// Additional roadmaps not in the featured list
const additionalRoadmaps = [
  {
    id: 'data-science',
    title: 'Data Science Learning Path',
    description: 'Master data science fundamentals including statistics, data visualization, and machine learning.',
    image: process.env.PUBLIC_URL + '/images/roadmaps/data-science.jpg',
    audience: 'STEM Students',
    resources: 10,
    difficulty: 'Intermediate',
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics Roadmap',
    description: 'Explore the ethical considerations, biases, and social implications of artificial intelligence.',
    image: process.env.PUBLIC_URL + '/images/roadmaps/ai-ethics.jpg',
    audience: 'All Students',
    resources: 8,
    difficulty: 'Beginner',
  }
];

// Combine all roadmaps
const allRoadmaps = [...aiRoadmaps, ...additionalRoadmaps];

const Roadmaps = () => {
  const [audienceFilter, setAudienceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Filter roadmaps based on active filters and search query
  const filteredRoadmaps = allRoadmaps.filter(roadmap => {
    const matchesAudience = audienceFilter === 'All' ? true : roadmap.audience === audienceFilter;
    const matchesDifficulty = difficultyFilter === 'All' ? true : roadmap.difficulty === difficultyFilter;
    const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAudience && matchesDifficulty && matchesSearch;
  });
  
  // Extract unique audiences from all roadmaps
  const audiences = ['All', ...new Set(allRoadmaps.map(roadmap => roadmap.audience))];
  
  // Extract unique difficulties from all roadmaps
  const difficulties = ['All', ...new Set(allRoadmaps.map(roadmap => roadmap.difficulty))];
  
  return (
    <div className="roadmaps-page">
      <div className="roadmaps-header">
        <div className="container">
          <h1>AI Learning Paths</h1>
          <p>Explore comprehensive learning roadmaps designed to guide you through your AI education journey.</p>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search roadmaps..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="roadmaps-filters">
          <div className="filter-section">
            <h3>Audience</h3>
            <div className="filter-buttons">
              {audiences.map(audience => (
                <button
                  key={audience}
                  className={`filter-button ${audienceFilter === audience ? 'active' : ''}`}
                  onClick={() => setAudienceFilter(audience)}
                >
                  {audience}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Difficulty</h3>
            <div className="filter-buttons">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  className={`filter-button ${difficultyFilter === difficulty ? 'active' : ''}`}
                  onClick={() => setDifficultyFilter(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="active-filters">
          {audienceFilter !== 'All' && (
            <div className="active-filter">
              <span>Audience: {audienceFilter}</span>
              <button className="clear-filter" onClick={() => setAudienceFilter('All')}>×</button>
            </div>
          )}
          
          {difficultyFilter !== 'All' && (
            <div className="active-filter">
              <span>Difficulty: {difficultyFilter}</span>
              <button className="clear-filter" onClick={() => setDifficultyFilter('All')}>×</button>
            </div>
          )}
          
          {searchQuery && (
            <div className="active-filter">
              <span>Search: {searchQuery}</span>
              <button className="clear-filter" onClick={() => setSearchQuery('')}>×</button>
            </div>
          )}
          
          {(audienceFilter !== 'All' || difficultyFilter !== 'All' || searchQuery) && (
            <button 
              className="clear-all-filters"
              onClick={() => {
                setAudienceFilter('All');
                setDifficultyFilter('All');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
        
        <div className="roadmaps-results">
          <h2>
            {filteredRoadmaps.length} {filteredRoadmaps.length === 1 ? 'Roadmap' : 'Roadmaps'} 
            {audienceFilter !== 'All' ? ` for ${audienceFilter}` : ''}
            {difficultyFilter !== 'All' ? ` at ${difficultyFilter} level` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </h2>
          
          <div className="roadmaps-grid">
            {filteredRoadmaps.length > 0 ? (
              filteredRoadmaps.map((roadmap) => (
                <div key={roadmap.id} className="roadmap-card">
                  {roadmap.image && (
                    <div className="roadmap-image">
                      <img 
                        src={roadmap.image} 
                        alt={roadmap.title}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x225?text=${encodeURIComponent(roadmap.title)}`;
                          e.target.onerror = null;
                        }} 
                      />
                    </div>
                  )}
                  <div className="roadmap-content">
                    <div className="roadmap-audience">
                      <span className="audience-label">For {roadmap.audience}</span>
                    </div>
                    <h3 className="roadmap-title">
                      {roadmap.title}
                    </h3>
                    <p className="roadmap-description">{roadmap.description}</p>
                    
                    <div className="roadmap-meta">
                      {roadmap.resources && (
                        <div className="meta-item">
                          <span className="meta-icon">📚</span>
                          <span>{roadmap.resources} resources</span>
                        </div>
                      )}
                      {roadmap.difficulty && (
                        <div className="meta-item">
                          <span className="meta-icon">🏆</span>
                          <span>{roadmap.difficulty}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link to={`/roadmaps/${roadmap.id}`} className="roadmap-link">
                      Explore Path →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No roadmaps found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
                <button 
                  className="button"
                  onClick={() => {
                    setAudienceFilter('All');
                    setDifficultyFilter('All');
                    setSearchQuery('');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;