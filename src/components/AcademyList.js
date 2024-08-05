import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AcademyList.css';
import AcademyImgDrawer from './AcademyImgDrawer';
import axios from 'axios';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return new Date(date).toLocaleDateString('en-GB', options).split('/').join('-'); // dd-mm-yy
};

const formatFee = (fee, feeType) => {
  const formattedFeeType = feeType.charAt(0).toUpperCase() + feeType.slice(1).replace('_', ' ');
  return `${fee} ${formattedFeeType}`;
};

const formatDuration = (duration, durationUnit) => `${duration} ${durationUnit}`;

const AcademyList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProviderIndex, setSelectedProviderIndex] = useState(null);
  const [category, setCategory] = useState('');
  const [providers, setProviders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerImages, setDrawerImages] = useState([]);
  const [lowestFee, setLowestFee] = useState(null);

  useEffect(() => {
    if (location.state && location.state.category) {
      setCategory(location.state.category);
    }
  }, [location]);

  useEffect(() => {
    if (category) {
      axios.get(`http://localhost:5000/api/users/all/${category}`)
        .then(response => {
          setProviders(response.data);
          const providerIds = response.data.map(provider => provider._id);
          return axios.get('http://localhost:5000/api/courses/by-providers', {
            params: { providerIds }
          });
        })
        .then(response => {
          const coursesData = response.data;
          setCourses(coursesData);

          // Find the lowest fee
          const fees = coursesData.map(course => course.feeAmount);
          const minFee = Math.min(...fees);
          setLowestFee(minFee);
        })
        .catch(error => {
          console.error('Error fetching providers or courses:', error);
        });
    }
  }, [category]);

  const handleSeeClassesClick = (index) => {
    setSelectedProviderIndex(selectedProviderIndex === index ? null : index);
  };

  const handleBookButtonClick = (classId) => {
    navigate('/slot-selection', { state: { classId } });
  };

  const handleImageClick = (images) => {
    setDrawerImages(images);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerImages([]);
  };

  return (
    <div className="academy-list-container">
      <div className="academy-list">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#home">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">{category}</li>
          </ol>
        </nav>
        <h1>{category} Classes for Kids in Qatar</h1>
        <p>
          Explore a vibrant world of creativity with arts & crafts classes. Let your child's imagination soar as they craft unique masterpieces.
          <br />
          You can also find <a href="#music">music</a>, <a href="#edu">educational</a>, <a href="#par">parent and baby or toddler</a>, and <a href="#hol">holiday camp</a> activities in Qatar or look at all <a href="#act">activities</a>.
        </p>
        <p>We have found <strong>{providers.length} providers</strong></p>

        {providers.map((provider, index) => {
          // Filter courses for the current provider
          const providerCourses = courses.filter(course => course.providerId === provider._id);

          // Aggregate unique days from all classes
          const uniqueDays = new Set();
          providerCourses.forEach(course => {
            course.days.forEach(day => uniqueDays.add(day));
          });

          return (
            <div key={index} className="provider-card">
              <div className='provider-card-contents'>
                <div className="provider-logo">
                  {provider.logo && <img src={`data:image/jpeg;base64,${provider.logo}`} alt={`${provider.username} logo`} className="provider-logo-image" />}
                </div>
                <div className="provider-info">
                  <h2>{provider.username}</h2>
                  <p>{provider.description || 'No description available'}</p>
                  <p>👶 {provider.ageRange || 'Age range not specified'}</p>
                  <p><i className="fa fa-map-marker"></i> {provider.distance || 'Distance not specified'}</p>
                  <p>📧 {provider.email || 'Email not available'}</p>
                  <p>📞 {provider.phoneNumber || 'Phone number not available'}</p>
                  <div className="provider-days">
                    {daysOfWeek.map((day, idx) => (
                      <span key={idx} className={`day ${uniqueDays.has(day.substring(0, 3)) ? 'highlight' : ''}`}>{day}</span>
                    ))}
                  </div>
                </div>
                <div className="provider-images" onClick={() => handleImageClick(provider.images || [])}>
                  <div className="provider-image-container">
                    <img
                      src={provider.images && provider.images[0]}
                      alt={`${provider.username} 1`}
                      className="provider-image"
                    />
                    {provider.images && provider.images.length > 1 && (
                      <div className="plus-overlay">
                        +{provider.images.length - 1} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="button-group">
                <button className="see-classes-button" onClick={() => handleSeeClassesClick(index)}>
                  {selectedProviderIndex === index ? 'Hide classes' : 'See classes'}
                </button>
                <button className="view-location-button" onClick={handleBookButtonClick}>
                  View Location
                </button>
              </div>
              {selectedProviderIndex === index && (
                <div className="provider-classes">
                  {providerCourses.length > 0 ? (
                    providerCourses.map((classInfo, idx) => (
                      <div className="provider-classes-card" key={idx}>
                        <div className="class-info">
                          <h3>{classInfo.name}</h3>
                          <div className="class-location">
                          📍{classInfo.location}
                          </div>
                          <p>💲{formatFee(classInfo.feeAmount, classInfo.feeType)}</p>
                          <p>⏳{formatDuration(classInfo.duration, classInfo.durationUnit)}({formatDate(classInfo.startDate)} to {formatDate(classInfo.endDate)})</p>
                          <p>👶 </p>
                          <div className="provider-days">
                            {daysOfWeek.map((day, dIdx) => (
                              <span key={dIdx} className={`day ${classInfo.days.includes(day.substring(0, 3)) ? 'highlight-green' : ''}`}>{day}</span>
                            ))}
                          </div>
                          <button className="book-button" onClick={() => handleBookButtonClick(classInfo._id)}><i className="fa fa-bolt"></i> Book</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No classes available</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AcademyImgDrawer images={drawerImages} isOpen={drawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default AcademyList;
