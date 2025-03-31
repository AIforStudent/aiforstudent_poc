import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(err => console.error('Error fetching course:', err));

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
      {/* ... render course header, tabs, and sidebar as before ... */}
    </div>
  );
};

export default CourseDetail;
