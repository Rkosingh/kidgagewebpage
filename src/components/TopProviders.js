import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TopProviders.css";
import badge from './assets/images/badge1.png';

const TopProviders = () => {
  const [position, setPosition] = useState(0);
  const [providers, setProviders] = useState([]);
  const [imageWidth, setImageWidth] = useState(0);
  const logoSliderRef = useRef(null);

  useEffect(() => {
    // Fetch the providers from the backend
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/all'); // Adjust the endpoint if necessary
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (logoSliderRef.current) {
      // Calculate image width after providers are set
      const slides = logoSliderRef.current.querySelectorAll('.logo-slide');
      if (slides.length > 0) {
        setImageWidth(slides[0].offsetWidth);
      }
    }
  }, [providers]);

  useEffect(() => {
    let interval;
    if (providers.length > 5) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          const slideWidth = imageWidth || 0;
          const numSlides = providers.length - 2; // Number of slides
          const newPosition = prevPosition - slideWidth;
          return newPosition <= -slideWidth * numSlides ? 0 : newPosition;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [providers.length, imageWidth]);

  const activeDot = Math.floor(Math.abs(position) / (imageWidth || 1));
  const dotCount = Math.max(providers.length - 2, 0); // Ensure at least 0 dots

  return (
    <div className="top-prov-body">
      <div className="top-providers">
        <h2>Top Providers</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas massa
          lacus.
        </p>
        <div className="logo-container">
          <div
            className="logo-slider"
            style={{ transform: `translateX(${providers.length > 5 ? position : 0}px)` }}
            ref={logoSliderRef}
          >
            {(providers.length > 5 ? providers.concat(providers.slice(0, 5)) : providers).map((provider, index) => (
              <div key={index} className="logo-slide">
                {provider.logo && <img src={`data:image/jpeg;base64,${provider.logo}`} alt={provider.username} />}
              </div>
            ))}
          </div>
        </div>
        {providers.length > 5 && dotCount > 0 && (
          <div className="provider-dots">
            {[...Array(dotCount)].map((_, index) => (
              <span
                key={index}
                className={`provider-dot ${index === activeDot ? "active" : ""}`}
              ></span>
            ))}
          </div>
        )}
      </div>
      <div className="badge-image">
        <img alt="badge" src={badge}></img>
      </div>
    </div>
  );
};

export default TopProviders;
