// src/pages/CourseDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CourseDetail.css';

// Components
import CourseModule from '../components/CourseModule';

// Data
import { getCourseById } from '../data/courses';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    // In a real app, this would be an API call
    const courseData = getCourseById(courseId);
    setCourse(courseData);
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading course...</p>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      {/* Course Header */}
      <header className="course-header">
        <div className="container">
          <div className="course-badges">
            {course.badges.map((badge, index) => (
              <span key={index} className={`badge ${badge.toLowerCase()}`}>
                {badge}
              </span>
            ))}
            <span className="badge beginner">{course.difficulty}</span>
          </div>
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          
          <div className="course-meta-info">
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{course.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📚</span>
              <span>{course.modules} modules</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">👥</span>
              <span>{course.students} students</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🔄</span>
              <span>Last updated {course.lastUpdated}</span>
            </div>
          </div>
          
          <div className="course-actions">
            <button className="button">Start Course</button>
            <button className="button secondary">Add to Bookmarks</button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="course-detail-layout">
          <div className="course-main-content">
            {/* Course Tabs */}
            <div className="course-tabs">
              <button 
                className={`tab ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Course Content
              </button>
              <button 
                className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button 
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            {/* Course Content Tab */}
            {activeTab === 'content' && (
              <div className="tab-content">
                <div className="course-modules">
                  {course.moduleContent.map((module, index) => (
                    <CourseModule 
                      key={index} 
                      module={module} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="tab-content">
                <div className="about-course">
                  <h2>About this course</h2>
                  <div className="course-long-description">
                    <p>{course.longDescription}</p>
                  </div>
                  
                  <h3>What you'll learn</h3>
                  <ul className="learning-outcomes">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index}>
                        <span className="check-icon">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  
                  <h3>Prerequisites</h3>
                  <ul className="prerequisites">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-content">
                <div className="course-reviews">
                  <h2>Student Reviews</h2>
                  <div className="reviews-summary">
                    <div className="overall-rating">
                      <div className="rating-number">{course.rating}</div>
                      <div className="rating-stars">★★★★★</div>
                      <div className="rating-count">{course.reviewCount} reviews</div>
                    </div>
                    <div className="rating-distribution">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="rating-bar">
                          <span>{stars} stars</span>
                          <div className="progress-bar">
                            <div 
                              className="progress" 
                              style={{ width: `${course.ratingDistribution[stars]}%` }}
                            ></div>
                          </div>
                          <span>{course.ratingDistribution[stars]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="reviews-list">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="review-card">
                        <div className="review-header">
                          <img src={review.avatar} alt={review.name} className="review-avatar" />
                          <div className="review-author">
                            <div className="reviewer-name">{review.name}</div>
                            <div className="review-date">{review.date}</div>
                          </div>
                          <div className="review-rating">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                        </div>
                        <p className="review-content">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="course-sidebar">
            <div className="instructor-card">
              <h3>Instructor</h3>
              <div className="instructor-profile">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="instructor-avatar" />
                <div className="instructor-details">
                  <div className="instructor-name">{course.instructor.name}</div>
                  <div className="instructor-title">{course.instructor.title}</div>
                </div>
              </div>
              <p className="instructor-bio">{course.instructor.bio}</p>
              <div className="instructor-stats">
                <div className="stat">
                  <span className="stat-value">{course.instructor.courses}</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{course.instructor.students}</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{course.instructor.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
            
            <div className="related-courses">
              <h3>Related Courses</h3>
              <ul className="related-courses-list">
                {course.relatedCourses.map((relatedCourse, index) => (
                  <li key={index}>
                    <Link to={`/courses/${relatedCourse.id}`} className="related-course">
                      <img src={relatedCourse.thumbnail} alt={relatedCourse.title} />
                      <div className="related-course-info">
                        <h4>{relatedCourse.title}</h4>
                        <div className="related-course-meta">
                          <span>{relatedCourse.duration}</span>
                          <span>{relatedCourse.difficulty}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;