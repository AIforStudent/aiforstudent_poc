import React from "react";
import { Link } from "react-router-dom";
import newsData from "../data/newsData";
import "../styles/NewsPage.css"; 

const NewsPage = () => {
    return (
        <div className="news-page">
            <h1 className="news-header">Latest News</h1>
            <p className="news-subtext">
                Be updated with what's new happening in the World of AI, 
                a one-stop destination for major AI updates.
            </p>

            <div className="news-container">
                {/* Left Side - News List */}
                <div className="news-list">
                    {newsData.map((newsItem) => (
                        <div key={newsItem.id} className="news-item">
                            <img src={newsItem.image} alt={newsItem.title} className="news-thumbnail" />
                            <h3 className="news-title">{newsItem.title}</h3>
                            <p className="news-meta">By {newsItem.author} • {newsItem.date}</p>
                            <p className="news-summary">{newsItem.summary}</p>
                            <Link to={newsItem.link} className="read-more-link">Read More</Link>
                        </div>
                    ))}
                </div>

                {/* Right Side - Recent News */}
                <div className="news-sidebar">
                    <h3>Recent Posts</h3>
                    <ul>
                        {newsData.slice(0, 5).map((newsItem) => (
                            <li key={newsItem.id}>
                                <Link to={newsItem.link} className="recent-news-item">{newsItem.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
