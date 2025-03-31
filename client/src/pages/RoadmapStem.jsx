// src/pages/RoadmapStem.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoadmapStem.css';

const RoadmapStem = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Track completion state
  const [completedModules, setCompletedModules] = useState({});

  const toggleModule = (moduleId) => {
    setCompletedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const roadmapSections = [
    {
      id: 'foundations',
      title: 'Foundations of Artificial Intelligence',
      estimatedTime: '2-3 weeks',
      description: "Build a solid foundation in AI concepts and principles to prepare for advanced learning.",
      topics: [
        {
          id: 'foundations-1',
          title: 'Pre-Requisite: Understanding of Backend/Full-Stack/Frontend Engineering',
          type: 'prerequisite',
          time: '2-4 weeks',
          description: "Having a basic understanding of programming concepts and web engineering is essential before diving into AI."
        },
        {
          id: 'foundations-2',
          title: 'Artificial Intelligence is for Everyone',
          type: 'theoretical',
          time: '3-4 hours',
          link: 'https://www.coursera.org/learn/ai-for-everyone',
          description: "A non-technical course designed to help you understand AI technologies and how they can impact your organization."
        },
        {
          id: 'foundations-3',
          title: 'Artificial Intelligence vs Machine Learning',
          type: 'theoretical',
          time: '1 hour',
          link: 'https://www.youtube.com/watch?v=4RixMPF4xis&ab_channel=IBMTechnology',
          description: "Understanding the critical differences between AI and ML and how they relate to each other."
        }
      ]
    },
    {
      id: 'terminologies',
      title: 'Common Terminologies',
      estimatedTime: '1-2 weeks',
      description: "Familiarize yourself with essential AI terminology and concepts used in the field.",
      topics: [
        {
          id: 'terminologies-1',
          title: 'What is a Large Language Model?',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://www.cloudflare.com/en-gb/learning/ai/what-is-large-language-model/',
          description: "Understand the architecture and functioning of LLMs that power many modern AI applications."
        },
        {
          id: 'terminologies-2',
          title: 'What is Artificial General Intelligence?',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://aws.amazon.com/what-is/artificial-general-intelligence/',
          description: "Explore the concept of AGI and how it differs from narrow AI systems."
        },
        {
          id: 'terminologies-3',
          title: 'What is Inference?',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://hazelcast.com/foundations/ai-machine-learning/machine-learning-inference/',
          description: "Learn about the process of using trained models to make predictions on new data."
        },
        {
          id: 'terminologies-4',
          title: 'Insights on Model Training',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://oden.io/glossary/model-training/',
          description: "Understand the process of training ML models and the challenges involved."
        },
        {
          id: 'terminologies-5',
          title: 'What exactly is Embedding?',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://www.cloudflare.com/en-gb/learning/ai/what-are-embeddings/',
          description: "Learn about vector representations of data that enable machines to understand semantics."
        }
      ]
    },
    {
      id: 'pretrained',
      title: 'Pretrained Models Introduction',
      estimatedTime: '2-3 weeks',
      description: "Learn about existing models that can be leveraged for various AI applications.",
      topics: [
        {
          id: 'pretrained-1',
          title: 'What are Pre-trained Models?',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://www.sciencedirect.com/science/article/pii/S2666651021000231',
          description: "Understand the concept of pre-trained models and their advantages in AI development."
        },
        {
          id: 'pretrained-2',
          title: 'Importance of pre-trained models',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://www.ahead.com/resources/why-pre-trained-models-matter-for-machine-learning/',
          description: "Learn why pre-trained models are critical for efficient AI development and implementation."
        },
        {
          id: 'pretrained-3',
          title: 'Pre-trained models case study: OpenAI',
          type: 'case-study',
          time: '2-3 hours',
          link: 'https://platform.openai.com/docs/models',
          description: "Explore OpenAI's pre-trained models and their capabilities."
        },
        {
          id: 'pretrained-4',
          title: "Bonus 1: OpenAI's deep thinking crushes coding benchmarks",
          type: 'bonus',
          time: '1 hour',
          link: 'https://www.youtube.com/watch?v=6xlPJiNpCVw',
          description: "See how advanced AI models perform on complex coding tasks."
        },
        {
          id: 'pretrained-5',
          title: 'What is context?',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://platform.openai.com/docs/guides/text-generation/managing-context-for-text-generation',
          description: "Understand how context affects AI model responses and how to manage it effectively."
        },
        {
          id: 'pretrained-6',
          title: 'What is capabilities?',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://platform.openai.com/docs/guides/text-generation',
          description: "Learn about the different capabilities of language models and how to leverage them."
        }
      ]
    },
    {
      id: 'embedding',
      title: 'Embedding',
      estimatedTime: '2-3 weeks',
      description: "Master embedding techniques that enable machines to understand semantic relationships in data.",
      topics: [
        {
          id: 'embedding-1',
          title: 'What is Embedding?',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://www.cloudflare.com/learning/ai/what-are-embeddings/',
          description: "Dive deeper into embeddings and their role in modern AI systems."
        },
        {
          id: 'embedding-2',
          title: 'OpenAI Embedding APIs',
          type: 'practical',
          time: '3-4 hours',
          link: 'https://www.youtube.com/watch?v=9oCS-VQupoc',
          description: "Learn how to use OpenAI's embedding APIs in your applications."
        },
        {
          id: 'embedding-3',
          title: 'Sentence Transformer',
          type: 'practical',
          time: '4-6 hours',
          link: 'https://roadmap.sh/ai-engineer#:~:text=What%20is%20BERT%3F-,Article,SentenceTransformers%20Documentation,-Article',
          description: "Understand how sentence transformers work and how they can be implemented."
        },
        {
          id: 'embedding-4',
          title: 'Hugging Face: Sentence Transformer',
          type: 'practical',
          time: '4-6 hours',
          link: 'https://huggingface.co/docs/hub/sentence-transformers',
          description: "Learn to use Hugging Face's implementation of sentence transformers for various NLP tasks."
        }
      ]
    },
    {
      id: 'vector-rag',
      title: 'Vector Databases and RAG',
      estimatedTime: '3-4 weeks',
      description: "Learn about vector databases and retrieval-augmented generation for enhanced AI applications.",
      topics: [
        {
          id: 'vector-rag-1',
          title: 'What are Vector Databases?',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://www.mongodb.com/resources/basics/databases/vector-databases',
          description: "Understand the purpose and design of databases specifically built for vector embeddings."
        },
        {
          id: 'vector-rag-2',
          title: 'Advantages of Vector Databases',
          type: 'theoretical',
          time: '1-2 hours',
          link: 'https://lakefs.io/blog/what-is-vector-databases/',
          description: "Learn why vector databases are essential for modern AI systems and their advantages."
        },
        {
          id: 'vector-rag-3',
          title: 'Pinecone: A popular vector DB',
          type: 'practical',
          time: '3-4 hours',
          link: 'https://www.pinecone.io/',
          description: "Explore Pinecone, one of the leading vector database solutions for AI applications."
        },
        {
          id: 'vector-rag-4',
          title: 'Implementing Vector DB: Embedding and Indexing',
          type: 'practical',
          time: '6-8 hours',
          link: 'https://www.youtube.com/watch?v=dN0lsF2cvm4',
          description: "Learn how to implement vector databases with proper embedding and indexing techniques."
        },
        {
          id: 'vector-rag-5',
          title: 'Introduction to RAG',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://www.youtube.com/watch?v=dN0lsF2cvm4',
          description: "Understand Retrieval-Augmented Generation and its role in enhancing AI responses."
        },
        {
          id: 'vector-rag-6',
          title: 'RAG v/s Fine-Tuning',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://www.youtube.com/watch?v=00Q0G84kq3M',
          description: "Compare and contrast RAG with fine-tuning approaches for different use cases."
        },
        {
          id: 'vector-rag-7',
          title: 'How to Implement Graph RAG Using Knowledge Graphs and Vector Databases',
          type: 'practical',
          time: '6-8 hours',
          link: 'https://towardsdatascience.com/how-to-implement-graph-rag-using-knowledge-graphs-and-vector-databases-60bb69a22759',
          description: "Advanced implementation of RAG with knowledge graphs for more structured information retrieval."
        },
        {
          id: 'vector-rag-8',
          title: 'What is LangChain?',
          type: 'practical',
          time: '4-6 hours',
          link: 'https://www.youtube.com/watch?v=1bUy-1hGZpI',
          description: "Learn about LangChain, a framework for developing applications powered by language models."
        }
      ]
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      estimatedTime: '3-4 weeks',
      description: "Explore autonomous AI agents that can perform tasks and make decisions.",
      topics: [
        {
          id: 'ai-agents-1',
          title: 'AI agents and their types',
          type: 'theoretical',
          time: '2-3 hours',
          link: 'https://play.ht/blog/ai-agents-use-cases/',
          description: "Understand the different types of AI agents and their applications."
        },
        {
          id: 'ai-agents-2',
          title: 'The Complete Guide to Building AI Agents for Beginners',
          type: 'practical',
          time: '8-10 hours',
          link: 'https://youtu.be/MOyl58VF2ak?si=-QjRD_5y3iViprJX',
          description: "A comprehensive guide to building your own AI agents from scratch."
        },
        {
          id: 'ai-agents-3',
          title: 'How does OpenAI Function Calling work?',
          type: 'practical',
          time: '3-4 hours',
          link: 'https://www.youtube.com/watch?v=Qor2VZoBib0',
          description: "Learn how to implement function calling with OpenAI's APIs to build more capable agents."
        },
        {
          id: 'ai-agents-4',
          title: 'OpenAI Assistants API',
          type: 'practical',
          time: '4-6 hours',
          link: 'https://www.youtube.com/watch?v=qHPonmSX4Ms',
          description: "Explore OpenAI's Assistants API for building purpose-built AI assistants."
        }
      ]
    }
  ];

  // Calculate total estimated time
  const totalTimeInWeeks = roadmapSections.reduce((acc, section) => {
    const [min, max] = section.estimatedTime.split('-').map(t => parseInt(t));
    return acc + (min + max) / 2;
  }, 0);
  
  // Calculate completion percentage
  const totalTopics = roadmapSections.reduce((acc, section) => 
    acc + section.topics.length, 0);
  
  const completedTopics = Object.values(completedModules).filter(val => val).length;
  
  const completionPercentage = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="roadmap-stem-page">
      {/* Hero Banner */}
      <section className="roadmap-hero">
        <div className="container">
          <div className="roadmap-hero-content">
            <span className="roadmap-badge">STEM Learning Path</span>
            <h1>Artificial Intelligence for STEM Students</h1>
            <p className="roadmap-subtitle">
              A comprehensive journey from AI fundamentals to advanced agent development specifically designed for students with technical backgrounds.
            </p>
            <div className="roadmap-metrics">
              <div className="metric">
                <span className="metric-value">{totalTimeInWeeks.toFixed(1)}</span>
                <span className="metric-label">Weeks to Complete</span>
              </div>
              <div className="metric">
                <span className="metric-value">{totalTopics}</span>
                <span className="metric-label">Learning Modules</span>
              </div>
              <div className="metric">
                <span className="metric-value">{completionPercentage}%</span>
                <span className="metric-label">Your Progress</span>
              </div>
            </div>
            <a href="#roadmap-timeline" className="button begin-journey">
              Begin Your Journey
            </a>
          </div>
          <div className="roadmap-hero-image">
            <img 
              src="/images/roadmaps/ai-stem-hero.jpg" 
              alt="AI for STEM Students"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=AI+for+STEM+Students';
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
      </section>
      
      {/* Introduction */}
      <section className="roadmap-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Why This Roadmap?</h2>
            <p>
              As a STEM student, you have the technical foundation to excel in AI development. This roadmap leverages your existing knowledge of mathematics, programming, and analytical thinking to fast-track your AI education journey.
            </p>
            <p>
              By following this carefully curated path, you'll develop expertise in AI fundamentals, pre-trained models, vector databases, and autonomous agents—skills that are increasingly in demand across industries and research fields.
            </p>
            <p>
              Whether you're aiming to specialize in AI research, enhance your current STEM discipline with AI capabilities, or prepare for a career in AI engineering, this roadmap provides a structured approach to achieving your goals.
            </p>
            <div className="intro-highlights">
              <div className="highlight">
                <div className="highlight-icon">🚀</div>
                <div className="highlight-text">From foundational concepts to advanced AI agent development</div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">🔄</div>
                <div className="highlight-text">Balanced mix of theoretical knowledge and practical application</div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">🔗</div>
                <div className="highlight-text">Curated resources from leading AI organizations and educators</div>
              </div>
            </div>
          </div>
          
          <div className="skill-level-legend">
            <h3>Skill Level Indicators</h3>
            <div className="legends">
              <div className="legend-item">
                <span className="legend-indicator beginner"></span>
                <span className="legend-label">Beginner</span>
              </div>
              <div className="legend-item">
                <span className="legend-indicator intermediate"></span>
                <span className="legend-label">Intermediate</span>
              </div>
              <div className="legend-item">
                <span className="legend-indicator advanced"></span>
                <span className="legend-label">Advanced</span>
              </div>
            </div>
          </div>
          
          <div className="module-type-legend">
            <h3>Module Type Indicators</h3>
            <div className="legends">
              <div className="legend-item">
                <span className="type-indicator theoretical"></span>
                <span className="legend-label">Theoretical Concepts</span>
              </div>
              <div className="legend-item">
                <span className="type-indicator practical"></span>
                <span className="legend-label">Practical Application</span>
              </div>
              <div className="legend-item">
                <span className="type-indicator prerequisite"></span>
                <span className="legend-label">Prerequisites</span>
              </div>
              <div className="legend-item">
                <span className="type-indicator case-study"></span>
                <span className="legend-label">Case Studies</span>
              </div>
              <div className="legend-item">
                <span className="type-indicator bonus"></span>
                <span className="legend-label">Bonus Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Learning Path Timeline */}
      <section id="roadmap-timeline" className="roadmap-timeline">
        <div className="container">
          <h2>Your AI Learning Journey</h2>
          <p className="timeline-description">
            Follow this structured learning path to build comprehensive AI skills from foundations to advanced applications. Track your progress as you go!
          </p>
          
          <div className="timeline-container">
            {roadmapSections.map((section, sectionIndex) => (
              <div key={section.id} className="timeline-section">
                <div className="timeline-milestone">
                  <div className="milestone-number">{sectionIndex + 1}</div>
                  <div className="milestone-content">
                    <h3 
                      className="milestone-title"
                      onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    >
                      {section.title}
                      <span className="toggle-icon">{activeSection === section.id ? '−' : '+'}</span>
                    </h3>
                    <div className="milestone-meta">
                      <span className="time-estimate">
                        <span className="meta-icon">⏱️</span> {section.estimatedTime}
                      </span>
                      <span className="module-count">
                        <span className="meta-icon">📚</span> {section.topics.length} modules
                      </span>
                    </div>
                    <p className="milestone-description">{section.description}</p>
                  </div>
                </div>
                
                {activeSection === section.id && (
                  <div className="timeline-topics">
                    {section.topics.map((topic) => (
                      <div key={topic.id} className={`topic-item ${completedModules[topic.id] ? 'completed' : ''}`}>
                        <div className="topic-checkbox">
                          <input 
                            type="checkbox" 
                            id={topic.id} 
                            checked={completedModules[topic.id] || false}
                            onChange={() => toggleModule(topic.id)}
                          />
                          <label htmlFor={topic.id}></label>
                        </div>
                        <div className="topic-content">
                          <div className="topic-header">
                            <h4 className="topic-title">
                              {topic.link ? (
                                <a href={topic.link} target="_blank" rel="noopener noreferrer">
                                  {topic.title} <span className="external-link">↗</span>
                                </a>
                              ) : (
                                topic.title
                              )}
                            </h4>
                            <span className={`topic-type ${topic.type}`}>{topic.type}</span>
                          </div>
                          <p className="topic-description">{topic.description}</p>
                          <div className="topic-meta">
                            <span className="topic-time">
                              <span className="meta-icon">⏱️</span> {topic.time}
                            </span>
                            {topic.link && (
                              <a href={topic.link} target="_blank" rel="noopener noreferrer" className="topic-link">
                                View Resource
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Real-world Applications */}
      <section className="real-world-applications">
        <div className="container">
          <h2>Real-world Applications & Opportunities</h2>
          <p className="section-description">
            The skills you'll develop through this roadmap open doors to numerous opportunities in research, industry, and entrepreneurship.
          </p>
          
          <div className="applications-grid">
            <div className="application-card">
              <div className="application-icon">🔬</div>
              <h3>Research Opportunities</h3>
              <p>
                Apply your AI skills to cutting-edge research in your STEM field. Many USC departments have research opportunities for students with AI expertise.
              </p>
              <a href="#" className="learn-more">Explore USC Research Labs →</a>
            </div>
            
            <div className="application-card">
              <div className="application-icon">💼</div>
              <h3>Industry Internships</h3>
              <p>
                Companies across all sectors are seeking students with AI skills for internships and entry-level positions.
              </p>
              <a href="#" className="learn-more">Browse Industry Partnerships →</a>
            </div>
            
            <div className="application-card">
              <div className="application-icon">🏆</div>
              <h3>AI Competitions</h3>
              <p>
                Participate in AI competitions like Kaggle challenges to apply your skills and add impressive achievements to your portfolio.
              </p>
              <a href="#" className="learn-more">Find Current Competitions →</a>
            </div>
            
            <div className="application-card">
              <div className="application-icon">🚀</div>
              <h3>Startup Ideas</h3>
              <p>
                Identify problems in your field that could be solved with AI and start building innovative solutions.
              </p>
              <a href="#" className="learn-more">Connect with USC Founders →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Resources */}
      <section className="additional-resources">
        <div className="container">
          <h2>Additional Resources</h2>
          <p className="section-description">
            Enhance your learning with these complementary resources and communities.
          </p>
          
          <div className="resources-grid">
            <div className="resource-card">
              <h3>USC AI Communities</h3>
              <ul className="resource-list">
                <li><a href="#">USC AI Club</a></li>
                <li><a href="#">STEM & AI Student Association</a></li>
                <li><a href="#">AI Research Interest Group</a></li>
                <li><a href="#">Women in AI @ USC</a></li>
              </ul>
            </div>
            
            <div className="resource-card">
              <h3>Recommended Books</h3>
              <ul className="resource-list">
                <li><a href="#">"Artificial Intelligence: A Modern Approach" by Russell & Norvig</a></li>
                <li><a href="#">"Deep Learning" by Goodfellow, Bengio & Courville</a></li>
                <li><a href="#">"Designing Machine Learning Systems" by Chip Huyen</a></li>
                <li><a href="#">"Building Intelligent Systems" by Geoff Hulten</a></li>
              </ul>
            </div>
            
            <div className="resource-card">
              <h3>Online Learning Platforms</h3>
              <ul className="resource-list">
                <li><a href="#">Coursera - Deep Learning Specialization</a></li>
                <li><a href="#">edX - AI Principles and Techniques</a></li>
                <li><a href="#">fast.ai - Practical Deep Learning</a></li>
                <li><a href="#">Hugging Face - NLP Course</a></li>
              </ul>
            </div>
            
            <div className="resource-card">
              <h3>Industry Certifications</h3>
              <ul className="resource-list">
                <li><a href="#">AWS Machine Learning Specialty</a></li>
                <li><a href="#">Google Professional Machine Learning Engineer</a></li>
                <li><a href="#">Microsoft Azure AI Engineer</a></li>
                <li><a href="#">TensorFlow Developer Certificate</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="roadmap-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Master AI?</h2>
            <p>Start your learning journey today and join thousands of STEM students building the future with AI.</p>
            <div className="cta-buttons">
              <a href="#roadmap-timeline" className="button">Begin Learning Path</a>
              <Link to="/" className="button secondary">Explore More Resources</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapStem;