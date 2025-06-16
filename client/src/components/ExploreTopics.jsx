import React, { useState } from "react";
import { 
  ChevronRight, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  FlaskConical, 
  Users, 
  TrendingUp, 
  Scale, 
  Heart, 
  Stethoscope, 
  MoreHorizontal 
} from "lucide-react";

const TopicCard = ({ topic, icon: Icon, onClick, isExpanded }) => {
  const handleClick = () => {
    if (isExpanded) {
      // Second click - navigate to topic page
      window.location.href = `/blog`;
    } else {
      // First click - expand card
      onClick(topic.slug);
    }
  };

  return (
    <div 
      className={`topic-card ${isExpanded ? 'expanded' : ''}`}
      onClick={handleClick}
    >
      <div className="topic-card-content">
        <div className="topic-icon">
          <Icon size={28} />
        </div>
        <div className="topic-info">
          <h3 className="topic-title">{topic.title}</h3>
          {!isExpanded && (
            <div className="topic-arrow">
              <ChevronRight size={20} />
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="topic-description">
          <p>{topic.description}</p>
          <div className="topic-action">
            <span className="explore-text">Click again to explore articles</span>
            <ChevronRight size={16} />
          </div>
        </div>
      )}
    </div>
  );
};

const ExploreTopics = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const aiTopics = [
    {
      title: "AI in Academia, Plagiarism & Integrity",
      slug: "academia-integrity",
      description: "Explore how AI is transforming academic research, addressing plagiarism concerns, and reshaping academic integrity policies in higher education.",
      icon: BookOpen
    },
    {
      title: "AI, Employment, and the Evolving Job Market",
      slug: "employment-jobs",
      description: "Discover how AI is changing the job landscape, creating new opportunities, and transforming traditional career paths across industries.",
      icon: Briefcase
    },
    {
      title: "AI Tools, Software & Technology Evolution",
      slug: "tools-technology",
      description: "Stay updated on the latest AI tools, software developments, and technological breakthroughs shaping our digital future.",
      icon: Cpu
    },
    {
      title: "AI in Education & Training",
      slug: "education-training",
      description: "Learn about AI's role in personalized learning, educational technology, and innovative skill development programs.",
      icon: GraduationCap
    },
    {
      title: "AI Research, Technical Advances & Startups",
      slug: "research-startups",
      description: "Dive into cutting-edge AI research, breakthrough discoveries, and innovative startup ecosystems driving the future.",
      icon: FlaskConical
    },
    {
      title: "AI, Society, Ethics & Policy",
      slug: "society-ethics",
      description: "Examine the societal implications of AI, ethical considerations, and policy frameworks being developed worldwide.",
      icon: Users
    },
    {
      title: "AI & the Economy / Consulting / Business Models",
      slug: "economy-business",
      description: "Understand AI's economic impact, consulting opportunities, and emerging business models in the AI-driven economy.",
      icon: TrendingUp
    },
    {
      title: "AI, Copyright, Ownership & Legal",
      slug: "copyright-legal",
      description: "Navigate the complex legal landscape of AI, including copyright issues, ownership rights, and regulatory frameworks.",
      icon: Scale
    },
    {
      title: "Motivation, Wellbeing & Social/Cultural Change",
      slug: "wellbeing-culture",
      description: "Explore AI's impact on mental health, social dynamics, and cultural transformation in our rapidly evolving digital age.",
      icon: Heart
    },
    {
      title: "AI in Science, Medicine & Healthcare",
      slug: "science-healthcare",
      description: "Discover revolutionary applications of AI in scientific research, medical diagnosis, and healthcare delivery systems.",
      icon: Stethoscope
    },
    {
      title: "Unclassified / Tools & Lifestyles / Miscellaneous",
      slug: "miscellaneous",
      description: "Find diverse AI applications, lifestyle tools, and innovative uses that don't fit traditional categories but impact daily life.",
      icon: MoreHorizontal
    }
  ];

  const handleTopicClick = (slug) => {
    setExpandedTopic(expandedTopic === slug ? null : slug);
  };

  return (
    <div className="explore-topics-container">
      <style jsx>{`
        .explore-topics-container {
          background: #1a1a1a;
          min-height: 100vh;
          padding: 80px 0;
          font-family: 'Arial', 'Helvetica', sans-serif;
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 3.5rem;
          color: #FFCC00;
          margin-bottom: 30px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 2px 2px 4px rgba(255, 204, 0, 0.3);
        }

        .section-subtitle {
          font-size: 1.4rem;
          color: #ffffff;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          opacity: 0.9;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }

        .topic-card {
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 16px;
          border: 2px solid #333333;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .topic-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FFCC00, #FFD700);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .topic-card:hover::before,
        .topic-card.expanded::before {
          transform: scaleX(1);
        }

        .topic-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(255, 204, 0, 0.2);
          border-color: #FFCC00;
        }

        .topic-card.expanded {
          border-color: #FFCC00;
          box-shadow: 0 25px 80px rgba(255, 204, 0, 0.3);
          transform: translateY(-8px);
        }

        .topic-card-content {
          padding: 35px;
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .topic-icon {
          background: linear-gradient(135deg, #FFCC00, #FFD700);
          color: #000000;
          width: 65px;
          height: 65px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(255, 204, 0, 0.3);
        }

        .topic-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .topic-title {
          flex: 1;
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.4;
          text-align: left;
        }

        .topic-arrow {
          color: #FFCC00;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .topic-card:hover .topic-arrow {
          transform: translateX(8px);
          opacity: 1;
        }

        .topic-description {
          padding: 0 35px 35px;
          border-top: 1px solid #444444;
          margin-top: 10px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .topic-description p {
          color: #cccccc;
          line-height: 1.7;
          margin: 25px 0;
          font-size: 1.1rem;
        }

        .topic-action {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #FFCC00;
          font-weight: 600;
          font-size: 1rem;
          margin-top: 20px;
        }

        .explore-text {
          transition: color 0.3s ease;
        }

        .topic-card.expanded:hover .explore-text {
          color: #FFD700;
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .container {
            max-width: 1200px;
            padding: 0 30px;
          }
        }

        @media (max-width: 1200px) {
          .topics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            max-width: 100%;
          }
          
          .container {
            padding: 0 25px;
          }

          .topic-card-content {
            padding: 30px;
          }

          .topic-title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 900px) {
          .topics-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .topic-card-content {
            padding: 30px;
            gap: 20px;
          }

          .topic-icon {
            width: 55px;
            height: 55px;
          }

          .topic-title {
            font-size: 1.2rem;
          }

          .section-title {
            font-size: 2.8rem;
          }

          .section-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 768px) {
          .explore-topics-container {
            padding: 60px 0;
          }

          .container {
            padding: 0 20px;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .topic-card-content {
            padding: 25px;
            gap: 15px;
          }

          .topic-title {
            font-size: 1.1rem;
          }

          .topic-icon {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Explore AI Topics</h1>
          <p className="section-subtitle">
            Dive deep into specific areas of AI that interest you most. From academic integrity to healthcare innovation, 
            discover how artificial intelligence is transforming every aspect of our world.
          </p>
        </div>
        
        <div className="topics-grid">
          {aiTopics.map((topic, index) => (
            <TopicCard
              key={index}
              topic={topic}
              icon={topic.icon}
              onClick={handleTopicClick}
              isExpanded={expandedTopic === topic.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreTopics;