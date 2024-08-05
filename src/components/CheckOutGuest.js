import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckOutGuest.css';

const CheckOutGuest = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    isOver18: false,
    interests: '',
    newInterest: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupYes = () => {
    navigate('/attendeecard');
  };

  const handleAddInterest = () => {
    if (formData.newInterest) {
      setFormData((prevData) => ({
        ...prevData,
        interests: prevData.interests
          ? `${prevData.interests}, ${prevData.newInterest}`
          : prevData.newInterest,
        newInterest: ''
      }));
    }
  };

  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const age = calculateAge(birthDate);
      if (age >= 18) {
        setFormData((prevData) => ({ ...prevData, isOver18: true }));
      } else {
        setFormData((prevData) => ({ ...prevData, isOver18: false }));
      }
    }
  }, [formData.dateOfBirth]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateAgeString = (birthDate) => {
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = (ageMonths + 12) % 12;
    }
    return `${ageYears}yrs ${ageMonths}mths`;
  };

  return (
    <body className='form-body'>
      <div className="co-form-container">
        <button className="back-button" onClick={() => navigate('/checkout')}>Back to activity details</button>
        <div className="step-bar">
          <label htmlFor="attendees">Attendee(s)</label>
          <input type="radio" id="attendees" name="step" defaultChecked />
          <div className="progress">
            <div className="progress-bar" style={{ width: '0%' }}></div>
          </div>
          <label htmlFor="attendees">Review</label>
        </div>
        <h2>A little bit about you</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <label>E-mail address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label>Phone number *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
              
          <h2>About your attendee(s)</h2>
          <div className="weekly-booking">
            <label>Weekly booking (M-F, 10am-3pm) <input type="checkbox" checked/></label>
            
            <div className="name-container">
              <div>
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="dob-gender-container">
              <div>
                <label>Date of birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                name=" isOver18"
                checked={formData.isOver18}
                onChange={handleChange}
                disabled
              />
              <label> Attendee is over 18</label>
            </div>
            
            <div className="interests-container">
              <label>Interests</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                readOnly
                style={{ width: '100%' }}
              />
              <div className="add-interests">
                <input
                  type="text"
                  name="newInterest"
                  value={formData.newInterest}
                  onChange={handleChange}
                  placeholder="Add interests"
                  style={{ width: '80%' }}
                />
                <button type="button" onClick={handleAddInterest} style={{ width: '18%' }}>+</button>
              </div>
              <p className="interest-hint">You can add swimming, dancing etc.</p>
            </div>
          </div>
          
          <button className='submit-button' type="submit">Submit</button>
        </form>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-icon">
                <span className="exclamation-mark">!</span>
              </div>
              <h2>Age Check</h2>
              <p>This activity is for attendees aged:</p>
              <p>5 - 9yrs</p>
              <p>Attendee(s) outside of age range:</p>
              <p><strong>{formData.firstName} {formData.lastName}:</strong> {calculateAgeString(new Date(formData.dateOfBirth))}</p>
              <p>Do you still want to book this class?</p>
              <div className="popup-buttons">
                <button className="popup-button yes" onClick={handlePopupYes}>Yes</button>
                <button className="popup-button cancel" onClick={handlePopupClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </body>
  );
}

export default CheckOutGuest;
