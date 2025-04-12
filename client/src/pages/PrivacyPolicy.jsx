// src/pages/PrivacyPolicy.jsx

import React from 'react';
import '../styles/Legal.css';

const PrivacyPolicy = () => {
  const lastUpdated = 'April 10, 2023';

  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>Introduction</h2>
          <p>
            AI for Students ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website, including any other media form, media channel, mobile website, 
            or mobile application related or connected to it.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, 
            please do not access the site.
          </p>
        </section>

        <section className="legal-section">
          <h2>Information We Collect</h2>
          <h3>Personal Data</h3>
          <p>
            We may collect personal identification information from you in a variety of ways, including, 
            but not limited to, when you visit our site, register on the site, fill out a form, and in 
            connection with other activities, services, features, or resources we make available on our site. 
            You may be asked for, as appropriate:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Educational institution (optional)</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We may also collect information about how the site is accessed and used. This usage data may include 
            information such as your computer's Internet Protocol address (e.g., IP address), browser type, 
            browser version, the pages of our site that you visit, the time and date of your visit, the time 
            spent on those pages, unique device identifiers, and other diagnostic data.
          </p>
        </section>

        <section className="legal-section">
          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect from you in the following ways:</p>
          <ul>
            <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested</li>
            <li>To improve our website in order to better serve you</li>
            <li>To allow us to better service you in responding to your customer service requests</li>
            <li>To administer content, promotions, surveys, or other site features</li>
            <li>To send periodic emails regarding your courses or other products and services</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Protection of Your Information</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you enter, 
            submit, or access your personal information. However, no method of transmission over the Internet, or method of 
            electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal 
            information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="legal-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our site and store certain information. 
            Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent 
            to your browser from a website and stored on your device.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
            do not accept cookies, you may not be able to use some portions of our site.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless 
            we provide users with advance notice. This does not include website hosting partners and other parties who assist 
            us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep 
            this information confidential.
          </p>
        </section>

        <section className="legal-section">
          <h2>Children's Privacy</h2>
          <p>
            Our site is not intended for children under 13 years of age. No one under age 13 may provide any personal information 
            to or on the website. We do not knowingly collect personal information from children under 13. If you are under 13, 
            do not use or provide any information on this website.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this 
            Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            AI for Students<br />
            University of Southern California<br />
            Los Angeles, CA 90007<br />
            contact@aiforstudents.edu
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;