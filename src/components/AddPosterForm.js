import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './AddCourseForm.css';

function AddPosterForm() {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        location: '',
        date: ''
    });

    const [showForm, setShowForm] = useState(true);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="add-course-form-container">
            <div className="add-course-form-header" onClick={toggleFormVisibility}>
                <h2>Add Poster</h2>
                <FaChevronDown className={`dropdown-icon ${showForm ? 'open' : ''}`} />
            </div>
            {showForm && (
                <form className="add-course-form" onSubmit={handleSubmit}>
                    <div className="form-group add-course-label-group">
                        <label htmlFor="name">Title</label>
                        <label htmlFor="file-upload">Image</label>
                    </div>
                    <div className="form-group add-course-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Poster Title"
                            value={course.name}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            id="file-upload"
                            name="type"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <div className="custom-file-upload">
                            <label htmlFor="file-upload" className="upload-icon">
                                <i className="fa fa-cloud-upload"></i>
                            </label>
                            <span className="file-name">{fileName}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Booking Link</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter Booking Link"
                            value={course.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group add-course-label-group">
                        <label htmlFor="location">Location</label>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-group add-course-group">
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter Event Location"
                            value={course.location}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={course.date}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default AddPosterForm;
