// src/pages/TermsOfService.jsx

import React from 'react';
import '../styles/Legal.css';

const TermsOfService = () => {
  const lastUpdated = 'April 10, 2023';

  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Terms of Service</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>Introduction</h2>
          <p>
            Welcome to AI for Students. These Terms of Service ("Terms") govern your use of our website 
            and the educational content, services, and tools that we provide. By accessing or using our 
            platform, you agree to be bound by these Terms and our Privacy Policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using our platform, you acknowledge that you have read, understood, and agree 
            to be bound by these Terms. If you do not agree to these terms, please do not use our site or services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Educational Purpose</h2>
          <p>
            AI for Students is an educational platform providing free resources for learning 
            artificial intelligence, programming, and related technologies. Our content is designed 
            for educational purposes only and should not be considered as professional advice 
            or certification.
          </p>
        </section>

        <section className="legal-section">
          <h2>User Accounts</h2>
          <p>
            Some features of our site may require you to create an account. You are responsible 
            for maintaining the confidentiality of your account credentials and for all activities 
            that occur under your account. You agree to notify us immediately of any unauthorized 
            use of your account.
          </p>
          <p>
            When creating an account, you agree to provide accurate, current, and complete information. 
            We reserve the right to suspend or terminate your account if any information provided 
            is found to be inaccurate, not current, or incomplete.
          </p>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property Rights</h2>
          <p>
            The content, features, and functionality of our site, including but not limited to text, 
            graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, 
            are owned by AI for Students, its licensors, or other content providers and are protected by 
            United States and international copyright, trademark, patent, and other intellectual property 
            or proprietary rights laws.
          </p>
          <p>
            You may access and use our content for personal, non-commercial, and educational purposes only. 
            You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, 
            create derivative works from, transfer, or sell any information, software, products, or services 
            obtained from our site without our prior written permission.
          </p>
        </section>

        <section className="legal-section">
          <h2>User-Generated Content</h2>
          <p>
            Our platform may allow you to post, submit, publish, display, or transmit content such as 
            reviews, comments, or forum posts ("User Content"). By providing User Content, you grant us 
            a non-exclusive, royalty-free, worldwide, perpetual, and irrevocable right to use, copy, 
            modify, adapt, publish, translate, create derivative works from, distribute, and display 
            such User Content in any media.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights to the User Content 
            you post and that such User Content does not violate the intellectual property rights 
            or any other rights of any third party.
          </p>
        </section>

        <section className="legal-section">
          <h2>Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our site in any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>Use our site to advertise or offer to sell goods and services</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the site</li>
            <li>Attempt to gain unauthorized access to our site, user accounts, or computer systems</li>
            <li>Use any robot, spider, or other automatic device to access our site for any purpose</li>
            <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other harmful material</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Links to Third-Party Websites</h2>
          <p>
            Our site may contain links to third-party websites or services that are not owned or controlled 
            by AI for Students. We have no control over and assume no responsibility for the content, 
            privacy policies, or practices of any third-party websites or services. You acknowledge and 
            agree that we shall not be responsible or liable for any damage or loss caused or alleged 
            to be caused by or in connection with the use of or reliance on any such content, goods, or services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Disclaimer of Warranties</h2>
          <p>
            Our site and its content are provided on an "as is" and "as available" basis without any 
            warranties of any kind. We disclaim all warranties, including but not limited to implied 
            warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </section>

        <section className="legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall AI for Students, its directors, employees, partners, agents, suppliers, 
            or affiliates be liable for any indirect, incidental, special, consequential, or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
            losses, resulting from your access to or use of or inability to access or use the site.
          </p>
        </section>

        <section className="legal-section">
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless AI for Students, its directors, employees, 
            partners, agents, suppliers, and affiliates from and against any claims, liabilities, damages, 
            judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) 
            arising out of or relating to your violation of these Terms or your use of the site.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to These Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time at our sole discretion. 
            The most current version will be posted on our site with the "Last Updated" date. Your 
            continued use of the site after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;