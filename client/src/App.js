// src/App.js

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
import Roadmaps from './pages/Roadmaps';
import NewsPage from "./pages/NewsPage"; 
import RoadmapDetail from './pages/RoadmapDetail';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import AboutProject from './pages/AboutProject';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ResearchTool from './pages/ResearchTool';

// Styles
import './styles/global.css';

function App() {
  // Use basename for GitHub Pages deployment if needed
  const basename = process.env.PUBLIC_URL || '';

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
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:roadmap_id" element={<RoadmapDetail />} />
          <Route path="/latest-news" element={<NewsPage />} /> 
          <Route path="/research-tool" element={<ResearchTool />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-project" element={<AboutProject />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;