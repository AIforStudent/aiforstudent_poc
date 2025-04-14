import React, { useState } from 'react';
import '../styles/ResearchTool.css';
import ResearchToolBlog from '../components/ResearchToolBlog';

const ResearchTool = () => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Tools data from prompt1.md
  const tools = [
    {
      name: "Waranara Library Research Assistant",
      description: "An AI-enabled tool available on MultiSearch that generates overviews of research topics based on academic sources.",
      features: ["Topic overviews", "Key source discovery", "Multilingual support"],
      dataSource: "Macquarie University Library",
      cost: "Free with university access",
      bestFor: "Initial research exploration"
    },
    {
      name: "Research Rabbit",
      description: "A free research platform that supports literature discovery through seed papers and visualization.",
      features: ["Collection building", "Interactive citation networks", "Collaboration", "Zotero integration"],
      dataSource: "Semantic Scholar",
      cost: "Free",
      bestFor: "Visual literature discovery"
    },
    {
      name: "Consensus",
      description: "A search engine exclusively for scientific research using Semantic Scholar data and AI models.",
      features: ["Consensus Meter", "Summary generation", "Chatbot for papers", "Advanced filters"],
      dataSource: "Semantic Scholar",
      cost: "Freemium",
      bestFor: "Finding consensus on research questions"
    },
    {
      name: "Elicit",
      description: "An AI tool for searching, screening, and summarizing literature, particularly for empirical research.",
      features: ["Natural language search", "PDF parsing", "Result summarization", "Bulk upload"],
      dataSource: "Semantic Scholar",
      cost: "Freemium",
      bestFor: "Empirical research screening"
    },
    {
      name: "Scite",
      description: "Provides quantitative and qualitative insights into how publications cite each other.",
      features: ["Citation context", "Customizable search", "Dashboard monitoring", "Network visualization"],
      dataSource: "Semantic Scholar, CrossRef, publishers",
      cost: "Freemium",
      bestFor: "Citation analysis"
    },
    {
      name: "SciSpace/Typeset",
      description: "A comprehensive research platform supporting the entire research process.",
      features: ["Chat with PDF", "Literature review", "AI writing", "Paraphrasing", "Citation generation"],
      dataSource: "Semantic Scholar",
      cost: "Freemium",
      bestFor: "End-to-end research assistance"
    },
    {
      name: "Connected Papers",
      description: "A visual tool that helps discover and explore papers related to one central work.",
      features: ["Force-directed graphs", "Similarity clustering", "Path highlighting"],
      dataSource: "Semantic Scholar",
      cost: "Freemium",
      bestFor: "Visual paper exploration"
    },
    {
      name: "Inciteful",
      description: "Offers tools for paper discovery and connecting literature across disciplines.",
      features: ["Paper Discovery", "Literature Connector", "Network analysis"],
      dataSource: "Semantic Scholar",
      cost: "Free",
      bestFor: "Interdisciplinary research connections"
    },
    {
      name: "LitMaps",
      description: "Generates interactive, dynamic maps of articles linked to a seed paper.",
      features: ["Interactive citation maps", "Temporal visualization", "Node expansion"],
      dataSource: "Semantic Scholar",
      cost: "Freemium",
      bestFor: "Citation mapping"
    }
  ];

  // Mock function to analyze prompts and rank tools
  const analyzePrompt = (promptText) => {
    setIsLoading(true);
    
    // Simple keyword matching algorithm (in a real app, this would be more sophisticated)
    const keywords = {
      'visual': ['Research Rabbit', 'Connected Papers', 'LitMaps', 'Inciteful'],
      'citation': ['Scite', 'Research Rabbit', 'Connected Papers', 'LitMaps'],
      'summary': ['Elicit', 'Consensus', 'SciSpace/Typeset'],
      'write': ['SciSpace/Typeset'],
      'overview': ['Waranara Library Research Assistant', 'Consensus'],
      'empirical': ['Elicit'],
      'interdisciplinary': ['Inciteful'],
      'pdf': ['SciSpace/Typeset', 'Elicit'],
      'multilingual': ['Waranara Library Research Assistant'],
      'free': ['Research Rabbit', 'Inciteful'],
      'integration': ['Research Rabbit'],
      'zotero': ['Research Rabbit']
    };
    
    const scores = tools.map(tool => {
      let score = 1; // Base score
      const promptLower = promptText.toLowerCase();
      
      // Check for direct name mentions
      if (promptLower.includes(tool.name.toLowerCase())) {
        score += 5;
      }
      
      // Check for keyword matches
      Object.entries(keywords).forEach(([keyword, relatedTools]) => {
        if (promptLower.includes(keyword) && relatedTools.includes(tool.name)) {
          score += 2;
        }
      });
      
      // Check for feature mentions
      tool.features.forEach(feature => {
        const featureWords = feature.toLowerCase().split(' ');
        featureWords.forEach(word => {
          if (promptLower.includes(word) && word.length > 3) {
            score += 1;
          }
        });
      });
      
      return {
        ...tool,
        score
      };
    });
    
    // Sort by score
    const sortedTools = [...scores].sort((a, b) => b.score - a.score);
    
    // Generate a summary based on the prompt
    let summary = "";
    if (promptText.includes('visual') || promptText.includes('map')) {
      summary = "Based on your interest in visual research tools, we recommend solutions that provide interactive citation maps and networks to help you discover related papers visually.";
    } else if (promptText.includes('citation') || promptText.includes('cite')) {
      summary = "For citation analysis, we've highlighted tools that can help you understand how papers are cited and the context of those citations.";
    } else if (promptText.includes('summary') || promptText.includes('summarize')) {
      summary = "You seem interested in summarizing research. The top-ranked tools can help process and condense information from multiple papers.";
    } else {
      summary = "Here are research tools ranked based on your requirements. The top tools match your needs most closely.";
    }
    
    // Simulate API delay
    setTimeout(() => {
      setResults({
        tools: sortedTools,
        summary
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      analyzePrompt(prompt);
    }
  };

  // Tool comparison data
  const comparisonData = {
    headers: [
      "Tool", "Data Source", "Cost", "Literature Searching", 
      "Interactive Citation Map", "Text Analysis", "Answer Generation", 
      "Upload References", "Integration"
    ],
    rows: [
      ["Research Rabbit", "Semantic Scholar", "Free", "✓", "✓", "✗", "✗", "✓", "Zotero sync, RIS import/export"],
      ["Elicit", "Semantic Scholar", "Freemium", "✓", "✗", "✓", "✓", "✓", "Zotero import, RIS export"],
      ["Scite", "Multiple sources", "Freemium", "✓", "✓", "✓", "✓", "✓", "Zotero/Mendeley import, RIS export"],
      ["SciSpace/Typeset", "Semantic Scholar", "Freemium", "✓", "✗", "✓", "✓", "✓", "RIS import/export"],
      ["Consensus", "Semantic Scholar", "Freemium", "✓", "✗", "✓", "✓", "✗", "APA cite, BibTeX export"],
      ["Connected Papers", "Semantic Scholar", "Freemium", "✓", "✓", "✗", "✗", "✗", "RIS export"],
      ["Inciteful", "Semantic Scholar", "Free", "✓", "✓", "✗", "✗", "✗", "RIS export"],
      ["LitMaps", "Semantic Scholar", "Freemium", "✓", "✓", "✗", "✗", "✗", "RIS export"]
    ]
  };

  return (
    <div className="research-tool-container">
      <div className="research-tool-header">
        <h1>Scholar.AI Bot</h1>
        <p className="research-tool-description">
          Find the perfect AI-powered tools to enhance your literature reviews. Enter your research 
          needs and our tool will suggest the most relevant solutions.
        </p>
      </div>

      <div className="research-tool-content">
        <div className="tool-finder-section">
          <h2>Find Your Ideal Research Tool</h2>
          <form onSubmit={handleSubmit} className="prompt-form">
            <div className="prompt-input-container">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your research needs (e.g., 'I need a tool to visualize citation networks')"
                className="prompt-input"
              />
              <button type="submit" className="prompt-submit-btn">Find Tools</button>
            </div>
          </form>

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Analyzing your requirements...</p>
            </div>
          )}

          {results && !isLoading && (
            <div className="results-container">
              <div className="results-summary">
                <h3>Analysis Summary</h3>
                <p>{results.summary}</p>
              </div>
              
              <div className="tool-rankings">
                <h3>Recommended Tools</h3>
                <div className="ranked-tools">
                  {results.tools.map((tool, index) => (
                    <div key={index} className={`tool-card ${index < 3 ? 'top-recommendation' : ''}`}>
                      <div className="tool-card-header">
                        <h4>{tool.name}</h4>
                        <span className="tool-score">{Math.floor(tool.score * 10)}% match</span>
                      </div>
                      <p>{tool.description}</p>
                      <div className="tool-features">
                        <strong>Key Features:</strong>
                        <ul>
                          {tool.features.map((feature, fidx) => (
                            <li key={fidx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="tool-metadata">
                        <span><strong>Data Source:</strong> {tool.dataSource}</span>
                        <span><strong>Cost:</strong> {tool.cost}</span>
                        <span><strong>Best For:</strong> {tool.bestFor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="tool-comparison-section">
          <h2>Tool Comparison</h2>
          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  {comparisonData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ResearchToolBlog />

        <div className="ai-prompt-interface">
          <h2>Chat with Research Assistant</h2>
          <div className="chat-interface">
            <p className="chat-info">
              This interface is under development. In the future, you'll be able to chat directly with 
              an AI assistant about research tools, literature review strategies, and get personalized recommendations.
            </p>
            <div className="chat-coming-soon">
              <strong>Coming Soon!</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTool;