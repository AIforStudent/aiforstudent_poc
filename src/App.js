// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import RoadmapDetail from './pages/RoadmapDetail';

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/roadmaps/:roadmapId" element={<RoadmapDetail />} />
          <Route path="*" element={
            <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>
              <h1>Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;