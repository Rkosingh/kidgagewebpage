import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AttendeeCard.css';
import paintingImage from './assets/images/painting.jpg';

const AttendeeCard = () => {
  const navigate = useNavigate();

  return (
    <body className='attendee-body'>
        <div className="attendee-card">
      <button className="back-button" onClick={() => navigate('/checkoutguest')}>Back to Attedendees</button>
        <div className="step-bar">
          <label htmlFor="attendees">Attendee(s)</label>
          <div className="progress">
            <div className="progress-bar" style={{ width: '100%' }}></div>
            
          </div>
          <input type="radio" id="attendees" name="step" defaultChecked />
          <label htmlFor="attendees">Review</label>
        </div>
      <div className="event-details">
        <img
          src={paintingImage}
          alt="Event"
          className="event-image"
        />
        <div className="event-info">
          <h2>SPLISH SPLASH! - Summer Holiday Activity Camp</h2>
          <p>Kaleidoscope Clubs and Courses</p>
          <div className="event-date">
            <span className="event-check">&#10003;</span>
            <span>Thu 11th July - 08:30 - 10:00</span>
          </div>
        </div>
      </div>
      <div className="booking-details">
        <h3>&#128188; 1 x Weekly booking (M-F, 10am-3pm)</h3>
        <p>£50.00 x 1 sessions</p>
        <div className="price">£50.00</div>
      </div>
      <div className="discount-code">
        <label>Discount code</label>
        <input type="text" placeholder="Insert your code here" />
        <div className="price">£0.00</div>
      </div>
      <div className="total-cost">
        <h3>Total cost</h3>
        <div className="price">£50.00</div>
      </div>
      <div className="email-optin">
        <input type="checkbox" id="email-optin" />
        <label htmlFor="email-optin">
          We’d love to email you with activity ideas and exclusive offers. If you'd prefer to not receive emails from Kidgage, tick this box.
        </label>
      </div>
      <div className="terms">
        By clicking "Proceed to payment" you agree to Kidgage's <a href="/terms">T&C's</a> and <a href="/privacy">Privacy Policy</a>.
      </div>
      <button className="proceed-to-payment">Proceed to Payment</button>
    </div>
    </body>
  );
};

export default AttendeeCard;
