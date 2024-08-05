import React from "react";
import "./IntroSearch.css";

const IntroSearch = () => {
  return (
    <div className="intro-search">
      <div className="intro-content">
        <h1 className="intro-title">A world of adventure awaits!</h1>
        <p className="intro-subtitle">
          Instantly book from 1000s of activities for your children from trusted
          providers
        </p>
      </div>
      <div className="search-ip-container">
      <div className="intro-search-bar">
        <input
          type="text"
          placeholder="Location | Age | Date | Activity"
          className="intro-search-input"
        />
        <button className="intro-search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="intro-search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>
      </div>
  );
};

export default IntroSearch;
