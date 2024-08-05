import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaEdit, FaTrash } from 'react-icons/fa';
import './EditBannerForm.css';

const EditBannerForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [banners, setBanners] = useState([]);
    const [editingBanner, setEditingBanner] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingBannerId, setDeletingBannerId] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/banners');
            setBanners(response.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setEditingBanner((prev) => ({ ...prev, image: e.target.files[0] })); // Update banner state with file
        } else {
            setFileName('No file chosen');
        }
    };

    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setShowEditModal(true);
    };

    const handleDelete = (bannerId) => {
        setDeletingBannerId(bannerId);
        setShowDeleteModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingBanner((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', editingBanner.title);
            formData.append('bookingLink', editingBanner.bookingLink); // Make sure the key matches the backend
            if (fileName !== 'No file chosen') {
                formData.append('image', editingBanner.image);
            }

            await axios.put(`http://localhost:5000/api/banners/${editingBanner._id}`, formData);
            fetchBanners();
            setShowEditModal(false);
            setEditingBanner(null);
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/banners/${deletingBannerId}`);
            fetchBanners();
            setShowDeleteModal(false);
            setDeletingBannerId(null);
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="add-course-form-container">
            <div className="add-course-form-header" onClick={toggleFormVisibility}>
                <h2>Edit Banner</h2>
                <FaChevronDown className={`dropdown-icon ${showForm ? 'open' : ''}`} />
            </div>
            {showForm && (
                <div className="add-course-form">
                    <h3>All Banners</h3>
                    <div className="banner-list">
                        {banners.map(banner => (
                            <div key={banner._id} className="banner-item">
                                <img src={banner.imageUrl} alt={banner.title} style={{ maxWidth: '200px' }} />
                                <h4>{banner.title}</h4>
                                <p>{banner.bookingLink}</p> {/* Ensure this matches the key in the backend */}
                                <button className='edit-banner-button' onClick={() => handleEdit(banner)}><FaEdit /> Edit</button>
                                <button className='edit-banner-button' onClick={() => handleDelete(banner._id)}><FaTrash /> Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Banner</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={editingBanner.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookingLink">Booking Link</label>
                                <input
                                    type="text"
                                    id="bookingLink"
                                    name="bookingLink"
                                    value={editingBanner.bookingLink}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="file-upload">Image</label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    name="file-upload"
                                    onChange={handleFileChange}
                                />
                                <span className="file-name">{fileName}</span>
                            </div>
                            <button type="submit">Confirm</button>
                            <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this banner?</p>
                        <button onClick={confirmDelete}>Confirm</button>
                        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditBannerForm;
