import React, { useState } from 'react';
import './AddCourseForm.css'; // Reuse the same CSS file for styling
import { FaChevronDown } from 'react-icons/fa';

const AddAcademyForm = ({ handleNavigation }) => {
    const [showForm, setShowForm] = useState(true);

    const initialFormState = {
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        logo: null,
        crFile: null,
        idCard: null,
        licenseNo: '',
        location: '' // New field for location URL
    };

    const [formData, setFormData] = useState(initialFormState);

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
        // Handle form submission logic here
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="add-course-form-container">
            <div className="add-course-form-header" onClick={toggleFormVisibility}>
                <h2>Add Academy</h2>
                <FaChevronDown className={`dropdown-icon ${showForm ? 'open' : ''}`} />
            </div>
            {showForm && (
                <form className="add-course-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Academy Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail ID"
                        required
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                    />
                    <div className='side-by-side'>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            required
                        />
                    </div>
                    <div className='side-by-side'>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Default Password"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                    <label className='sign-in-label' htmlFor="logo">Academy Logo</label>
                    <div className='side-by-side'>
                        <input
                            type="file"
                            name="logo"
                            onChange={handleChange}
                            accept=".png, .jpg, .jpeg"
                        />
                        <input
                            type="text"
                            name="licenseNo"
                            value={formData.licenseNo}
                            onChange={handleChange}
                            placeholder="License number"
                            required
                        />
                    </div>
                    <div className='add-upload-label-group'>
                        <label className='sign-in-label' htmlFor="crFile">CR</label>
                        <label className='sign-in-label' htmlFor="idCard">ID Card</label>
                    </div>
                    <div className='side-by-side'>
                        <input
                            type="file"
                            name="crFile"
                            onChange={handleChange}
                            accept=".pdf"
                        />
                        <input
                            type="file"
                            name="idCard"
                            onChange={handleChange}
                            accept=".pdf"
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="location">Add Location</label>
                        <input
                            type="url"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter map URL"
                        />
                    </div>
                    <button type="submit">Create Academy</button>
                </form>
            )}
        </div>
    );
}

export default AddAcademyForm;
