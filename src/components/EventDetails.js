import React from 'react';
import { useLocation } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const location = useLocation();
  const { event } = location.state;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <img src={event.image} alt={event.name} />
      <p>{event.description}</p>
      <h4>Venue: {event.venue}</h4>
      <h4>Date: {event.date}</h4>
      <button id="book-now"><i className="fas fa-arrow-right"></i>BOOK NOW</button>
    </div>
  );
};

export default EventDetails;
