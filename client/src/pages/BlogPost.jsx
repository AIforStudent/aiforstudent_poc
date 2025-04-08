import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/BlogPost.css";

const BlogPost = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        // Fetch individual blog post by id from the backend API
        const resBlog = await fetch(`http://127.0.0.1:5001/api/blogs/${blogId}`);
        if (!resBlog.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const blogData = await resBlog.json();
        setBlog(blogData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      window.scrollTo(0, 0);
    }
    fetchBlog();
  }, [blogId]);

  // Automatically redirect to the external article when blog data is loaded
  useEffect(() => {
    if (blog && blog.externalLink) {
      window.location.href = blog.externalLink;
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="loading-container">
        <p>Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <p>Redirecting to original site...</p>
      <p>
        If the redirect does not happen,{" "}
        <a
          href={blog.externalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          click here.
        </a>
      </p>
    </div>
  );
};

export default BlogPost;
