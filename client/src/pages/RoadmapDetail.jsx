import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RoadmapDetail.css'; // Make sure to import your new CSS

const RoadmapDetail = () => {
  const { roadmap_id } = useParams(); // or { id } if you changed your route
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        // const res = await fetch(`http://127.0.0.1:5001/api/roadmaps/${roadmap_id}`);
        const res = await fetch(`https://aiforstudent-poc.onrender.com/api/roadmaps/${roadmap_id}`);
        if (!res.ok) throw new Error('Failed to fetch roadmap');
        const data = await res.json();
        setRoadmap(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmap();
  }, [roadmap_id]);

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
      {/* Header area */}
      <div className="roadmap-detail-header">
        <div className="container">
          <h1>{roadmap.title}</h1>
          <p>{roadmap.description}</p>

          {/* Example: Difficulty or audience badges */}
          <div className="roadmap-meta">
            {roadmap.audience && <div>{roadmap.audience}</div>}
            {roadmap.difficulty && <div>{roadmap.difficulty}</div>}
            {roadmap.resources !== undefined && (
              <div>{roadmap.resources} Resources</div>
            )}
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="roadmap-detail-content container">
        
        {/* Roadmap Image */}
        {roadmap.image && (
          <div className="roadmap-detail-image">
            <img
              src={roadmap.image}
              alt={roadmap.title}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(
                  roadmap.title
                )}`;
                e.target.onerror = null;
              }}
            />
          </div>
        )}

        {/* Example: "Why This Roadmap?" Block (optional) */}
        <div className="why-this-roadmap">
          <h2>Why This Roadmap?</h2>
          <p>
            Highlight the benefits, outcomes, or unique aspects of this roadmap here. 
            Show users why they should follow this path and how it will help them.
          </p>
        </div>

        {/* Render sections if available */}
        {roadmap.sections && roadmap.sections.length > 0 ? (
          roadmap.sections.map((section) => (
            <div key={section.section_id} className="roadmap-section">
              <h2>{section.title}</h2>
              <p><strong>Estimated Time:</strong> {section.estimatedTime}</p>
              <p>{section.description}</p>
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
          /* If you have a simpler roadmap with top-level topics only */
          <div className="roadmap-section">
            <h2>Topics</h2>
            <div className="section-topics">
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
          </div>
        ) : (
          <p>No additional topics available.</p>
        )}

        {/* Example: Additional Resources (optional) */}
        <div className="additional-resources">
          <h2>Additional Resources</h2>
          <p>Link out to external reading, references, or advanced courses here.</p>
        </div>

        {/* Example: CTA Section */}
        <div className="ready-to-master">
          <h2>Ready to Master AI?</h2>
          <p>Start your AI learning journey today and become the next AI expert!</p>
          <button className="cta-button">Start Now</button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
