import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Styles
import './styles/global.css';

function App() {
  // Use basename for GitHub Pages
  const basename = process.env.PUBLIC_URL;

  return (
    <Router basename={basename}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;