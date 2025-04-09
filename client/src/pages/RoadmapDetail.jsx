import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoadmapDetail = () => {
  // Extract "id" from useParams to match the route definition
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const res = await fetch(`http://127.0.0.1:5001/api/roadmaps/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch roadmap');
        }
        const data = await res.json();
        setRoadmap(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading roadmap...</p>
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

  if (!roadmap) {
    return (
      <div className="not-found-container">
        <p>Roadmap not found.</p>
      </div>
    );
  }

  return (
    <div className="roadmap-detail-page">
      <div className="roadmap-detail-header">
        <div className="container">
          <h1>{roadmap.title}</h1>
          <p>{roadmap.description}</p>
        </div>
      </div>
      <div className="roadmap-detail-content container">
        {roadmap.image && (
          <div className="roadmap-detail-image">
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

        {/* Render sections if available */}
        {roadmap.sections && roadmap.sections.length > 0 ? (
          roadmap.sections.map((section) => (
            <div key={section.section_id} className="roadmap-section">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <p><strong>Estimated Time:</strong> {section.estimatedTime}</p>
              <div className="section-topics">
                {section.topics && section.topics.length > 0 ? (
                  section.topics.map((topic, idx) => (
                    <div key={idx} className="topic-item">
                      <h3>{topic.title}</h3>
                      <p>{topic.description}</p>
                      <p><strong>Modules:</strong> {topic.modules}</p>
                      {topic.link && (
                        <a href={topic.link} target="_blank" rel="noopener noreferrer">
                          Read More &rarr;
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No topics available in this section.</p>
                )}
              </div>
            </div>
          ))
        ) : roadmap.topics && roadmap.topics.length > 0 ? (
          <div className="roadmap-topics">
            {roadmap.topics.map((topic, idx) => (
              <div key={idx} className="topic-item">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <p><strong>Modules:</strong> {topic.modules}</p>
                {topic.link && (
                  <a href={topic.link} target="_blank" rel="noopener noreferrer">
                    Read More &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No additional topics available.</p>
        )}
      </div>
    </div>
  );
};

export default RoadmapDetail;
