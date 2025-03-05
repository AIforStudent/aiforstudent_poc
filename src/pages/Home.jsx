import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Components
import CourseCard from '../components/CourseCard';
import BlogCard from '../components/BlogCard';
import RecentBlogs from '../components/RecentBlogs';
import AINewsSection from '../components/AINewsSection';

// Data - Make sure these imports match your file structure
import { featuredCourses } from '../data/courses';
import { recentBlogs } from '../data/blogPosts';
import { aiNews } from '../data/aiNews';

const Home = () => {
  // Default empty arrays to prevent mapping errors
  const courses = featuredCourses || [];
  const blogs = recentBlogs || [];
  const news = aiNews || [];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Elevate Your <span className="highlight">Coding Skills</span> at USC
            </h1>
            <p className="hero-description">
              Welcome to USC Learning Portal v2, a place to level up your coding skills and build awesome projects.
              Created specifically for USC students to excel in the tech industry.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="button">
                Explore Courses
              </Link>
              <Link to="/blog" className="button secondary">
                Read Blog
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">20+</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat">
                <span className="stat-value">15k+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-value">500+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            {/* Using a placeholder if the actual image isn't available */}
            <img 
              src="/images/hero-banner.jpg" 
              alt="USC Students Coding"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=USC+Students+Coding';
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Learning Paths</h2>
            <Link to="/courses" className="view-all">
              View All Courses
            </Link>
          </div>
          <div className="courses-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p>No courses available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      {blogs.length > 0 && <RecentBlogs blogs={blogs} />}

      {/* AI News Section */}
      {news.length > 0 && <AINewsSection news={news} />}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Learning Journey Today</h2>
            <p>
              Join thousands of USC students who are already building their
              skills and preparing for successful careers in tech.
            </p>
            <Link to="/courses" className="button">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;