import React from "react";
import "../styles/NewsItem.css"; // Separate CSS for News Items

const NewsItem = ({ news }) => {
    return (
        <div className="news-item">
            <img src={news.image} alt={news.title} className="news-thumbnail" />
            <h3>{news.title}</h3>
            <p className="news-meta">By {news.author} • {news.date}</p>
            <p className="news-summary">{news.summary}</p>
        </div>
    );
};

export default NewsItem;
