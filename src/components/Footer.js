import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import ChatbotPage from "./ChatbotPage";  // Import the ChatbotPage component
import "./Footer.css";
import chatbot from './assets/images/chatbot1.png';
import logoimage from './assets/images/logobw.png';

const Footer = () => {
  const [showChat, setShowChat] = useState(false); // State to control chatbot visibility

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src={logoimage}
            alt="KIDGAGE"
            className="footer-logo-image"
          />
        </div>
        <div className="footer-center">
          <div className="footer-social-icons">
            <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://facebook.com" className="footer-social-link" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" className="footer-social-link" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" className="footer-social-link" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://youtube.com" className="footer-social-link" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <div className="footer-links">
            <a href="/terms" className="footer-link">Terms & Conditions</a>
            <span className="footer-link-separator">|</span>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <span className="footer-link-separator">|</span>
            <a href="/contact" className="footer-link">Contact Us</a>
            <span className="footer-link-separator">|</span>
            <a href="/blog" className="footer-link">Blog</a>
            <span className="footer-link-separator">|</span>
            <a href="/careers" className="footer-link">Careers</a>
          </div>
          <div className="footer-copyright">Copyright ©2024 Kidgage</div>
        </div>
        <div className="poster-uploader-logo" onClick={() => setShowChat(!showChat)}>
          <img
            src={chatbot}
            alt="Chatbot"
            className="poster-uploader-logo-image"
          />
        </div>
      </div>

      {/* Conditionally render the ChatbotPage component when the chatbot image is clicked */}
      <div className={`chatbot-container ${showChat ? 'show' : 'hide'}`}>
        <ChatbotPage />
      </div>
    </footer>
  );
};

export default Footer;
