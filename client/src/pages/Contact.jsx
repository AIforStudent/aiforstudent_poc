// src/pages/Contact.jsx

import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <div className="contact-subtitle">Have questions or feedback? We'd love to hear from you.</div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          
          <div className="contact-info-item">
            <h3><i className="fa-solid fa-location-dot"></i> Location</h3>
            <p>University of Southern California<br />Los Angeles, CA 90007</p>
          </div>
          
          <div className="contact-info-item">
            <h3><i className="fa-solid fa-clock"></i> Response Time</h3>
            <p>We typically respond within 1-2 business days</p>
          </div>

          <div className="social-links">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://twitter.com/USC" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-globe"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {isSubmitted ? (
            <div className="success-message">
              <i className="fa-solid fa-check-circle"></i>
              <h3>Thank you for your message!</h3>
              <p>We've received your inquiry and will get back to you as soon as possible.</p>
              <button 
                className="new-message-btn" 
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;