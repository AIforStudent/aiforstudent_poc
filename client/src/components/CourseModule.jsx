// src/components/CourseModule.jsx

import React, { useState } from 'react';
import '../styles/CourseModule.css';

const CourseModule = ({ module, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const { title, duration, lessons, description } = module;
  
  // Calculate completion percentage (this would come from user data in a real app)
  const completionPercentage = 0;
  
  return (
    <div className={`course-module ${isExpanded ? 'expanded' : ''}`}>
      <div className="module-header" onClick={toggleExpand}>
        <div className="module-info">
          <div className="module-number">Module {index + 1}</div>
          <h3 className="module-title">{title}</h3>
        </div>
        <div className="module-meta">
          <div className="module-duration">{duration}</div>
          <div className="module-lessons-count">{lessons.length} lessons</div>
          <div className="expand-icon">{isExpanded ? '−' : '+'}</div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="module-content">
          {description && (
            <div className="module-description">
              <p>{description}</p>
            </div>
          )}
          
          <div className="module-progress">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span className="progress-text">{completionPercentage}% complete</span>
          </div>
          
          <ul className="lessons-list">
            {lessons.map((lesson, lessonIndex) => (
              <li key={lessonIndex} className="lesson-item">
                <div className="lesson-checkbox">
                  <input type="checkbox" id={`lesson-${index}-${lessonIndex}`} />
                  <label htmlFor={`lesson-${index}-${lessonIndex}`}></label>
                </div>
                <div className="lesson-content">
                  <div className="lesson-title">
                    {lesson.title}
                    {lesson.isExternalLink && (
                      <span className="external-link-icon"> 🔗</span>
                    )}
                  </div>
                  {lesson.description && (
                    <div className="lesson-description">{lesson.description}</div>
                  )}
                </div>
                <div className="lesson-meta">
                  <div className="lesson-type">{getLessonTypeIcon(lesson.type)}</div>
                  <div className="lesson-duration">{lesson.duration}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Helper function to get icon for lesson type
function getLessonTypeIcon(type) {
  const icons = {
    video: '🎬',
    article: '📄',
    quiz: '❓',
    project: '🛠️',
    exercise: '💻',
    discussion: '💬',
    resource: '📚',
  };
  
  return icons[type] || '📚';
}

export default CourseModule;