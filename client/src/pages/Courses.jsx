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
    id: 'python',
    title: 'Python for Data Science, AI & Development',
    subtitle: 'Learn Python and access and web scrape data using APIs and Python libraries.',
    thumbnail: process.env.PUBLIC_URL + '/images/course-thumbnails/ai5.jpg',
    category: 'Python',
    difficulty: 'Beginner',
    duration: '25 hrs',
    modules: 5,
    badges: [''],
    instructor: {
      name: 'Joseph Santarcangelo',
      title: 'IBM',
      avatar: process.env.PUBLIC_URL + '/images/instructors/coursera.png'
    },
    externalLink: 'https://www.coursera.org/learn/python-for-applied-data-science-ai'
  }
];

// Combine all courses
const allCourses = [...featuredCourses, ...additionalCourses];

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Filter courses based on active filters and search query
const filteredCourses = allCourses.filter(course => {
  const matchesCategory = activeFilter === 'All' ? true : course.category === activeFilter;
  const matchesDifficulty = difficultyFilter === 'All' ? true : course.difficulty === difficultyFilter;
  const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesDifficulty && matchesSearch;
});
  
  // Extract unique categories from all courses
  const categories = ['All', ...new Set(allCourses.map(course => course.category))];
  
  // Extract unique difficulties from all courses
  const difficulties = ['All', ...new Set(allCourses.map(course => course.difficulty))];
  
  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="container">
          <h1>Learn to Code with USC</h1>
          <p>Choose from a variety of courses designed to help USC students master AI, ML, Data Science and more.</p>
          
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
          {activeFilter !== 'All' && (
            <div className="active-filter">
              <span>Category: {activeFilter}</span>
              <button className="clear-filter" onClick={() => setActiveFilter('All')}>×</button>
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
          
          {(activeFilter !== 'All' || difficultyFilter !== 'All' || searchQuery) && (
            <button 
              className="clear-all-filters"
              onClick={() => {
                setActiveFilter('All');
                setDifficultyFilter('All');
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
            {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
            {difficultyFilter !== 'All' ? ` for ${difficultyFilter} level` : ''}
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
                    setActiveFilter('All');
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
        
        {/* <div className="courses-cta">
          <div className="cta-content">
            <h2>Need Help Choosing a Course?</h2>
            <p>Speak with a USC academic advisor to get personalized recommendations based on your career goals.</p>
            <button className="button">Schedule Consultation</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Courses;