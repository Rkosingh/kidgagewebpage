import React, { useState } from 'react';
import './UpcomingEvents.css';
import poster1 from './assets/images/poster1.png';
import poster2 from './assets/images/poster2.png';
import poster3 from './assets/images/poster3.png';
import poster4 from './assets/images/poster4.png';
import poster5 from './assets/images/poster5.png';

import '@fortawesome/fontawesome-free/css/all.min.css';

const eventsData = [
  { id: 1, image: poster1, name: 'EVENT NAME', description: 'DESCRIPTION', venue: 'VENUE', date: '01/07', live: 'LIVE' },
  { id: 2, image: poster2, name: 'EVENT NAME', description: 'DESCRIPTION', venue: 'VENUE', date: '02/07', live: 'LIVE' },
  { id: 3, image: poster3, name: 'EVENT NAME', description: 'DESCRIPTION', venue: 'VENUE', date: '02/07', live: 'LIVE' },
  { id: 4, image: poster4, name: 'EVENT NAME', description: 'DESCRIPTION', venue: 'VENUE', date: '02/07', live: 'LIVE' },
  { id: 5, image: poster5, name: 'EVENT NAME', description: 'DESCRIPTION', venue: 'VENUE', date: '02/07', live: 'LIVE' },
  { id: 6, image: poster1, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
  { id: 7, image: poster2, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
  { id: 8, image: poster3, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
  { id: 9, image: poster4, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
  { id: 10, image: poster5, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
  { id: 11, image: poster1, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
  { id: 12, image: poster2, name: 'Event 2', description: 'Description 2', venue: 'Venue 2', date: '02/07' },
];

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const UpcomingEvents = () => {
  const [selectedMonth, setSelectedMonth] = useState('JULY');
  const [viewAll, setViewAll] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const monthIndex = months.indexOf(selectedMonth) + 1;
  const monthString = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;

  const filteredEvents = eventsData.filter(event => event.date.split('/')[1] === monthString);
  const addToWishlist = (eventId) => {
    setWishlist([...wishlist, eventId]);
  };

  return (
    <div className="upcoming-events">
      <div className="upcoming-events-heading">
        <h2>
          Upcoming event in
          <div className="select-container">
            <select className="select-month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
              {months.map(month => <option key={month} value={month}>{month}</option>)}
            </select>
            <i className="fa-solid fa-caret-down event-drop-down"></i>
          </div>
        </h2>
      </div>
      {filteredEvents.length > 0 ? (
        <>
          <div className="events-grid">
            {filteredEvents.slice(0, viewAll ? filteredEvents.length : 5).map(event => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.name} />
                <p>{event.live}</p>
                <h4>{event.name}</h4>
                <h4>{event.description}</h4>
                <h4>{event.venue}</h4>
                <h4>{event.date}</h4>
                <button id="wishlist" onClick={() => addToWishlist(event.id)}><i class="fa-solid fa-heart-circle-plus"></i></button>
                <button id="book-now"><i className="fas fa-arrow-right"></i>BOOK NOW</button>
                <button id="calendar"><i className="fa-regular fa-calendar-plus"></i></button>
                <button id="call"><i className="fa-solid fa-phone"></i></button>
              </div>
            ))}
          </div>
          {filteredEvents.length > 5 && (
            <button className='event-view-all' onClick={() => setViewAll(!viewAll)}>
              {viewAll ? 'Hide' : 'View All'}
            </button>
          )}
        </>
      ) : (
        <div className="no-events">No events available for the selected month.</div>
      )}
    </div>
  );
}

export default UpcomingEvents;
