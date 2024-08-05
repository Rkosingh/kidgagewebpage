import React, { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import './AddCourseForm.css';
import poster1 from './assets/images/poster1.png';
import poster2 from './assets/images/poster2.png';
import poster3 from './assets/images/poster3.png';
import poster4 from './assets/images/poster4.png';
import poster5 from './assets/images/poster5.png';

const bannersData = [
    { id: 1, image: poster1, title: 'Event 1', link: 'link1', description: 'Description 1', location: 'Venue 1', date: '2024-07-01' },
    { id: 2, image: poster2, title: 'Event 2', link: 'link2', description: 'Description 2', location: 'Venue 2', date: '2024-07-02' },
    { id: 3, image: poster3, title: 'Event 3', link: 'link3', description: 'Description 3', location: 'Venue 3', date: '2024-07-03' },
    { id: 4, image: poster4, title: 'Event 4', link: 'link4', description: 'Description 4', location: 'Venue 4', date: '2024-07-04' },
    { id: 5, image: poster5, title: 'Event 5', link: 'link5', description: 'Description 5', location: 'Venue 5', date: '2024-07-05' },
];

const EditPosterForm = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setSelectedBanner((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSearch = () => {
        const foundBanner = bannersData.find(banner => banner.title.toLowerCase() === searchQuery.toLowerCase());
        setSelectedBanner(foundBanner);
        setEditMode(false); // Ensure edit mode is off when a new search is performed
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            // Handle delete logic here
            setSelectedBanner(null);
            setEditMode(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedBanner((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setEditMode(false);
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="add-course-form-container">
            <div className="add-course-form-header" onClick={toggleFormVisibility}>
                <h2>Edit Poster</h2>
                <FaChevronDown className={`dropdown-icon ${showForm ? 'open' : ''}`} />
            </div>
            {showForm && (
                <div className="add-course-form">
                    <div className="form-group search-provider-group">
                        <label htmlFor="search">Search Poster by Title:</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter Poster Title..."
                        />
                        <button type="button" className="search-provider-button" onClick={handleSearch}>
                            <FaSearch />
                        </button>
                    </div>
                    {selectedBanner && (
                        <div className="banner-details">
                            {!editMode ? (
                                <>
                                    <h2>{selectedBanner.title}</h2>
                                    <img src={selectedBanner.image} alt={selectedBanner.title} />
                                    <p>{selectedBanner.link}</p>
                                    <button className='edit-banner-button' onClick={handleEdit}>Edit</button>
                                    <button className='edit-banner-button' onClick={handleDelete}>Delete</button>
                                </>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group add-course-label-group">
                                        <label htmlFor="title">Title</label>
                                        <label htmlFor="file-upload">Image</label>
                                    </div>
                                    <div className="form-group add-course-group">
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder='Enter Banner Title'
                                            value={selectedBanner.title}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file-upload"
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
                                        <label htmlFor="link">Booking Link</label>
                                        <input
                                            type='text'
                                            id="link"
                                            name="link"
                                            placeholder='Enter Booking Link'
                                            value={selectedBanner.link}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type='text'
                                            id="description"
                                            name="description"
                                            placeholder='Enter Description'
                                            value={selectedBanner.description}
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
                                            placeholder='Enter Event Location'
                                            value={selectedBanner.location}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={selectedBanner.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditPosterForm;
