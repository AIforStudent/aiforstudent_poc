import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import '../styles/Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the backend
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API_URL}/api/courses`)
    fetch('https://aiforstudent-poc.onrender.com/api/courses/')
    // fetch('http://localhost:5001/api/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeFilter === 'All' || course.category === activeFilter;
    const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.subtitle && course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categories = ['All', ...new Set(courses.map(course => course.category))];
  const difficulties = ['All', ...new Set(courses.map(course => course.difficulty))];

  if (loading) {
    return <div className="container">Loading courses...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="courses-page">
      <div className="container">
        {/* Search and Filter UI */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-section">
          <div>
            <h3>Categories</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-button ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div>
            <h3>Difficulty</h3>
            {difficulties.map((diff) => (
              <button
                key={diff}
                className={`filter-button ${difficultyFilter === diff ? 'active' : ''}`}
                onClick={() => setDifficultyFilter(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
          <button
            className="clear-all-filters button"
            onClick={() => {
              setActiveFilter('All');
              setDifficultyFilter('All');
              setSearchQuery('');
            }}
          >
            Clear all filters
          </button>
        </div>

        {/* Courses Results */}
        <div className="courses-results">
          <h2>
            {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}{' '}
            {activeFilter !== 'All' ? `in ${activeFilter}` : ''}{' '}
            {difficultyFilter !== 'All' ? `for ${difficultyFilter} level` : ''}{' '}
            {searchQuery ? `matching "${searchQuery}"` : ''}
          </h2>
          <div className="courses-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
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
      </div>
    </div>
  );
};

export default Courses;
