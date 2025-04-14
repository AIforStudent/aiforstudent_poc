import React, { useState } from 'react';
import '../styles/ResearchToolBlog.css';

const ResearchToolBlog = () => {
  const [expandedTool, setExpandedTool] = useState(null);

  const blogContent = [
    {
      id: 'waranara',
      title: 'Waranara Library Research Assistant',
      shortDescription: 'An AI-enabled tool that helps with topic overviews and finding key sources.',
      fullContent: `
        <h4>Waranara Library Research Assistant (Beta)</h4>
        <p>The Waranara Library Research Assistant is an AI-enabled tool available on MultiSearch, which is part of the Macquarie University Library catalogue. It offers several powerful features:</p>
        <ul>
          <li>Generate overviews of new research topics based on academic sources</li>
          <li>Discover five key sources on your topic, plus additional related academic content</li>
          <li>Support for multiple languages, allowing diverse research contexts</li>
        </ul>
        <p><strong>How to Access:</strong> Navigate to the library's MultiSearch page, sign in using your OneID, and click on the Research Assistant icon on the toolbar to start your natural language search.</p>
      `
    },
    {
      id: 'research-rabbit',
      title: 'Research Rabbit',
      shortDescription: 'A free platform for visual literature discovery with citation networks.',
      fullContent: `
        <h4>Research Rabbit</h4>
        <p>Research Rabbit is a free research platform that revolutionizes literature discovery by enabling you to:</p>
        <ul>
          <li>Build collections with seed papers, from which the tool recommends additional relevant literature</li>
          <li>Visualize networks of papers and co-authorships through interactive graphs</li>
          <li>Track citations across early works, later works, and similar studies</li>
          <li>Collaborate and share collections with colleagues</li>
          <li>Sync with Zotero and import/export RIS files for seamless reference management</li>
        </ul>
        <p>This tool excels in providing visual representations of academic relationships, making it easier to discover connected research.</p>
      `
    },
    {
      id: 'consensus',
      title: 'Consensus',
      shortDescription: 'An AI search engine for scientific research with summaries and consensus analysis.',
      fullContent: `
        <h4>Consensus</h4>
        <p>Consensus is a specialized search engine designed exclusively for scientific research. It utilizes Semantic Scholar data and leverages AI models (like OpenAI's GPT-4) to provide both topic-level and paper-level insights:</p>
        <ul>
          <li>The "Consensus Meter" classifies study results as "yes," "no," or "possibly"</li>
          <li>For yes/no research questions, it delivers a one-sentence summary of the top 10 studies</li>
          <li>Includes a chatbot feature for papers with full-text PDFs</li>
          <li>Advanced filters let you refine results by study design, sample size, methodology, and more</li>
        </ul>
        <p>Consensus is particularly valuable when trying to determine the academic consensus on specific research questions.</p>
      `
    },
    {
      id: 'elicit',
      title: 'Elicit',
      shortDescription: 'An AI tool for searching, screening, and summarizing empirical research literature.',
      fullContent: `
        <h4>Elicit</h4>
        <p>Elicit is an AI tool primarily designed to assist in searching, screening, and summarizing literature, with particular utility in empirical research areas such as randomized controlled trials. Key capabilities include:</p>
        <ul>
          <li>Searching over 200 million papers using natural language queries</li>
          <li>Parsing PDFs through integrations with Unpaywall and Grobid</li>
          <li>Summarizing results and displaying key information in easy-to-read tables</li>
          <li>Supporting bulk upload of PDF documents for information extraction</li>
          <li>Enabling downloads in CSV or .bib formats for integration with reference managers</li>
        </ul>
        <p>Elicit excels at processing empirical studies and extracting structured information like sample sizes, methodologies, and outcomes.</p>
      `
    },
    {
      id: 'scite',
      title: 'Scite',
      shortDescription: 'Provides insights into how publications cite each other, with contextual analysis.',
      fullContent: `
        <h4>Scite</h4>
        <p>Scite provides both quantitative and qualitative insights into citation patterns by analyzing over 1.2 billion citation statements from research outputs. Its powerful features include:</p>
        <ul>
          <li>Analyzing how many times a paper is cited by others</li>
          <li>Showing the context of citations (supportive, contrasting, or mention)</li>
          <li>Customizing search criteria by selecting trusted journals and year ranges</li>
          <li>Creating personalized dashboards to monitor new citations</li>
          <li>Offering interactive visualizations of citation networks</li>
        </ul>
        <p>Scite is particularly valuable for understanding the impact and reception of research papers within their field.</p>
      `
    },
    {
      id: 'scispace',
      title: 'SciSpace/Typeset',
      shortDescription: 'A comprehensive platform with PDF chat, literature review tools, and AI writing assistance.',
      fullContent: `
        <h4>SciSpace (formerly Typeset)</h4>
        <p>SciSpace is a comprehensive research platform with multiple capabilities supporting the entire research process:</p>
        <ul>
          <li>"Chat with PDF" feature to summarize and answer questions from documents</li>
          <li>Literature review tools for exploring related papers through natural language</li>
          <li>AI writer to expand research notes into full paragraphs</li>
          <li>Tools for identifying research concepts across 285 million papers</li>
          <li>Paraphrasing and citation generation supporting multiple formats</li>
          <li>Data extraction and table customization capabilities</li>
          <li>AI detection tools for assessing content authenticity</li>
        </ul>
        <p>SciSpace stands out for its all-in-one approach to research assistance, from reading and understanding papers to writing and formatting.</p>
      `
    },
    {
      id: 'connected-papers',
      title: 'Connected Papers',
      shortDescription: 'A visual tool for discovering related papers through interactive force-directed graphs.',
      fullContent: `
        <h4>Connected Papers</h4>
        <p>Connected Papers is an innovative visual tool that helps researchers discover and explore papers related to a central work. It uses algorithms that analyze Semantic Scholar data to create interactive force-directed graphs with unique properties:</p>
        <ul>
          <li>Papers are arranged by similarity, not just direct citations</li>
          <li>The tool builds clusters revealing connections between seemingly unrelated articles</li>
          <li>Selecting a paper highlights the shortest path back to your original seed paper</li>
          <li>Visual representations make it easy to identify influential works in a field</li>
        </ul>
        <p>This tool excels at helping researchers see the broader landscape of a research area and discover important papers they might otherwise miss.</p>
      `
    },
    {
      id: 'inciteful',
      title: 'Inciteful',
      shortDescription: 'Offers tools for paper discovery and connecting literature across disciplines.',
      fullContent: `
        <h4>Inciteful</h4>
        <p>Inciteful offers two distinct and powerful tools for research discovery:</p>
        <ul>
          <li><strong>Paper Discovery tool:</strong> Builds a network of papers from a single seed paper using network analysis algorithms to determine similarity, importance, and prolific authors/institutions</li>
          <li><strong>Literature Connector tool:</strong> Designed to help interdisciplinary scholars bridge gaps between fields by visually mapping the connections between two papers</li>
        </ul>
        <p>Inciteful is particularly valuable for researchers working across disciplines or trying to connect disparate areas of research. Its network-based approach helps identify paths between seemingly unrelated academic works.</p>
      `
    },
    {
      id: 'litmaps',
      title: 'LitMaps',
      shortDescription: 'Creates interactive, dynamic maps of articles linked to seed papers.',
      fullContent: `
        <h4>LitMaps</h4>
        <p>LitMaps generates an interactive, dynamic map of articles linked to a seed paper, with several distinguishing features:</p>
        <ul>
          <li>Recent articles appear on the right side while highly-cited ones are highlighted at the top</li>
          <li>Lines indicate citation relationships, making it easy to track the evolution of ideas</li>
          <li>Users can click individual nodes to expand the map with additional concepts</li>
          <li>The visual layout helps researchers understand temporal and influence relationships</li>
        </ul>
        <p>LitMaps is excellent for visualizing the historical development of research areas and identifying the most influential works in a citation network.</p>
      `
    }
  ];

  const toggleExpand = (id) => {
    if (expandedTool === id) {
      setExpandedTool(null);
    } else {
      setExpandedTool(id);
    }
  };

  return (
    <div className="research-tool-blog-section">
      <h2>AI Research Tools Blog</h2>
      <p className="blog-intro">
        Learn more about each AI-powered research tool. Click on a tool to expand and read detailed information.
      </p>

      <div className="blog-posts">
        {blogContent.map((post) => (
          <div key={post.id} className="blog-post">
            <div 
              className="blog-post-header" 
              onClick={() => toggleExpand(post.id)}
            >
              <h3>{post.title}</h3>
              <div className="expand-icon">{expandedTool === post.id ? '−' : '+'}</div>
            </div>
            
            <div className="blog-post-short-desc">
              <p>{post.shortDescription}</p>
            </div>
            
            {expandedTool === post.id && (
              <div 
                className="blog-post-full-content"
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchToolBlog;