import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseCard.css';

const CourseCard = ({ course }) => {
  if (!course) return null;
  
  const {
    id,
    title,
    subtitle,
    thumbnail,
    category,
    difficulty,
    duration,
    modules,
    badges = [],
    instructor
  } = course;

  return (
    <div className="course-card card">
      <div className="course-thumbnail">
        <img 
          src={thumbnail} 
          alt={title}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x225?text=${encodeURIComponent(title)}`;
            e.target.onerror = null;
          }} 
        />
        {badges && badges.map((badge, index) => (
          <span key={index} className={`badge ${badge.toLowerCase()}`}>
            {badge}
          </span>
        ))}
      </div>
      <div className="course-content">
        {category && (
          <div className="course-category">
            <span className="category-icon">{getCategoryIcon(category)}</span>
            <span className="category-name">{category}</span>
          </div>
        )}
        <h3 className="course-title">
          <Link to={`/courses/${id}`}>{title}</Link>
        </h3>
        {subtitle && <p className="course-subtitle">{subtitle}</p>}
        <div className="course-meta">
          {duration && (
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{duration}</span>
            </div>
          )}
          {modules && (
            <div className="meta-item">
              <span className="meta-icon">📚</span>
              <span>{modules} modules</span>
            </div>
          )}
          {difficulty && (
            <div className="meta-item">
              <span className="meta-icon">🏆</span>
              <span>{difficulty}</span>
            </div>
          )}
        </div>
      </div>
      {instructor && (
        <div className="course-instructor">
          <img 
            src={instructor.avatar} 
            alt={instructor.name} 
            className="instructor-avatar"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/36x36?text=${encodeURIComponent(instructor.name.charAt(0))}`;
              e.target.onerror = null;
            }}  
          />
          <div className="instructor-info">
            <span className="instructor-name">{instructor.name}</span>
            {instructor.title && <span className="instructor-title">{instructor.title}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get category icons
function getCategoryIcon(category) {
  const categoryIcons = {
    'Frontend': '🌐',
    'React': '⚛️',
    'JavaScript': '📜',
    'AI': '🤖',
    'Python': '🐍',
    'Data Science': '📊',
    'CSS': '🎨',
    'HTML': '📄',
    'TypeScript': '📘',
    'Frameworks': '🧩'
  };
  
  return categoryIcons[category] || '📚';
}

export default CourseCard;