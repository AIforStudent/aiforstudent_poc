// src/pages/Courses.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import '../styles/Courses.css';

// Import course data
import { featuredCourses } from '../data/courses';

// Additional courses not in the featured list
const additionalCourses = [
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer Path',
    subtitle: 'Master both frontend and backend development to become a versatile developer.',
    thumbnail: '/images/course-thumbnails/full-stack.jpg',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    duration: '92 hrs',
    modules: 85,
    badges: ['PRO'],
    instructor: {
      name: 'Michael Rodriguez',
      title: 'Full Stack Developer',
      avatar: '/images/instructors/michael.jpg'
    }
  },
  {
    id: 'data-science-basics',
    title: 'Data Science Foundations',
    subtitle: 'Learn the fundamentals of data science with Python, pandas, and visualization.',
    thumbnail: '/images/course-thumbnails/data-science.jpg',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '18.5 hrs',
    modules: 15,
    badges: ['NEW'],
    instructor: {
      name: 'Emily Wong',
      title: 'Data Scientist',
      avatar: '/images/instructors/emily.jpg'
    }
  },
  {
    id: 'cybersecurity-essentials',
    title: 'Cybersecurity Essentials',
    subtitle: 'Learn how to protect applications from common security threats.',
    thumbnail: '/images/course-thumbnails/cybersecurity.jpg',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '14.3 hrs',
    modules: 12,
    badges: ['PRO', 'NEW'],
    instructor: {
      name: 'James Lee',
      title: 'Security Specialist',
      avatar: '/images/instructors/james.jpg'
    }
  },
  {
    id: 'database-design',
    title: 'Database Design & SQL',
    subtitle: 'Master database design principles and SQL for application development.',
    thumbnail: '/images/course-thumbnails/database.jpg',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '16.8 hrs',
    modules: 14,
    badges: [],
    instructor: {
      name: 'David Chen',
      title: 'Database Architect',
      avatar: '/images/instructors/david.jpg'
    }
  }
];

// Combine all courses
const allCourses = [...featuredCourses, ...additionalCourses];

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  // Filter courses based on active filters and search query
  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = activeFilter === 'all' || course.category === activeFilter;
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });
  
  // Extract unique categories from all courses
  const categories = ['all', ...new Set(allCourses.map(course => course.category))];
  
  // Extract unique difficulties from all courses
  const difficulties = ['all', ...new Set(allCourses.map(course => course.difficulty))];
  
  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="container">
          <h1>Learn to Code with USC</h1>
          <p>Choose from a variety of courses designed to help USC students master web development, AI, and more.</p>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="courses-filters">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
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
          {activeFilter !== 'all' && (
            <div className="active-filter">
              <span>Category: {activeFilter}</span>
              <button className="clear-filter" onClick={() => setActiveFilter('all')}>×</button>
            </div>
          )}
          
          {difficultyFilter !== 'all' && (
            <div className="active-filter">
              <span>Difficulty: {difficultyFilter}</span>
              <button className="clear-filter" onClick={() => setDifficultyFilter('all')}>×</button>
            </div>
          )}
          
          {searchQuery && (
            <div className="active-filter">
              <span>Search: {searchQuery}</span>
              <button className="clear-filter" onClick={() => setSearchQuery('')}>×</button>
            </div>
          )}
          
          {(activeFilter !== 'all' || difficultyFilter !== 'all' || searchQuery) && (
            <button 
              className="clear-all-filters"
              onClick={() => {
                setActiveFilter('all');
                setDifficultyFilter('all');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
        
        <div className="courses-results">
          <h2>
            {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} 
            {activeFilter !== 'all' ? ` in ${activeFilter}` : ''}
            {difficultyFilter !== 'all' ? ` for ${difficultyFilter} level` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </h2>
          
          <div className="courses-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="no-results">
                <h3>No courses found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
                <button 
                  className="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setDifficultyFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="courses-cta">
          <div className="cta-content">
            <h2>Need Help Choosing a Course?</h2>
            <p>Speak with a USC academic advisor to get personalized recommendations based on your career goals.</p>
            <button className="button">Schedule Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;