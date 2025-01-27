import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import './SignUpForm.css';

const BusinessSignUp = ({ handleNavigation }) => {
  const initialFormState = {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    logo: null,
    crFile: null,
    idCard: null,
    licenseNo: '',
    confirmPassword: '',
    agreeTerms: false,
    academyType: '' // New field
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [academyTypes, setAcademyTypes] = useState([]); // State for academy types

  useEffect(() => {
    const fetchAcademyTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/course-category/categories'); // Adjust endpoint as needed
        setAcademyTypes(response.data);
      } catch (error) {
        console.error('Error fetching academy types', error);
      }
    };

    fetchAcademyTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form submitted:', response.data);
      setFormData(initialFormState);
      setSuccess('Signed Up Successfully!');
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className='s-form-body'>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Business Sign-up</h2>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Academy Name" required />
        <div className="form-group">
          <select
            id="academyType"
            name="academyType"
            value={formData.academyType}
            onChange={handleChange}
            required
          >
            <option value="">Select Academy Type</option>
            {academyTypes.map((type) => (
              <option key={type._id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail ID" required />
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone number" required />
        <div className='side-by-side'>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" required />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" required />
        </div>
        <label className='sign-in-label' htmlFor="logo">Business Logo</label>
        <input type="file" name="logo" onChange={handleChange} accept=".png, .jpg, .jpeg" />
        <label className='sign-in-label' htmlFor="crFile">CR</label>
        <input type="file" name="crFile" onChange={handleChange} accept=".pdf" />
        <label className='sign-in-label' htmlFor="idCard">ID Card</label>
        <input type="file" name="idCard" onChange={handleChange} accept=".pdf" />
        <input type="text" name="licenseNo" value={formData.licenseNo} onChange={handleChange} placeholder="License number" required />
        <div className='side-by-side'>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
        </div>
        
        <div className="terms-container">
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
          <label htmlFor="agreeTerms">I agree to the <a href="#">terms and conditions</a></label>
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <Button primary>Create Account</Button>
      </form>
    </div>
  );
};

export default BusinessSignUp;
