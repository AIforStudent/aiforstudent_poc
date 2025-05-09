// src/components/ArticleCard.jsx
import React from "react";
import "../styles/ArticleCard.css";

const ArticleCard = ({ article }) => {
  // format the timestamp (ms) or ISO‐string to “Month day, Year”
  const formatDate = (d) => {
    let dt = typeof d === "number"
      ? new Date(d)
      : new Date(d.$date || d);
    return dt.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <a
      href={article.externalLink}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card"
    >
      <div className="article-card-content">
        <div className="article-card-date">{formatDate(article.date)}</div>
        <p className="article-card-excerpt">{article.excerpt}</p>
      </div>
    </a>
  );
};

export default ArticleCard;