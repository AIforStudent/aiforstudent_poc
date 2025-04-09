// src/pages/Roadmaps.jsx
import React, { useState, useEffect } from 'react';
import RoadmapCard from '../components/RoadmapCard'; // Note the "../components" path
import '../styles/Roadmaps.css';

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states (optional)
  const [audienceFilter, setAudienceFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const res = await fetch('http://127.0.0.1:5001/api/roadmaps');
        if (!res.ok) {
          throw new Error('Failed to fetch roadmaps');
        }
        const data = await res.json();
        setRoadmaps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmaps();
  }, []);

  // Filter logic (optional)
  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesAudience =
      audienceFilter === 'All' || roadmap.audience === audienceFilter;
    const matchesDifficulty =
      difficultyFilter === 'All' || roadmap.difficulty === difficultyFilter;
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAudience && matchesDifficulty && matchesSearch;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading roadmaps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="roadmaps-page">
      <div className="container">
        <h1>Learning Roadmaps</h1>
        {/* Optional filter UI */}
        <div className="roadmaps-grid">
          {filteredRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;