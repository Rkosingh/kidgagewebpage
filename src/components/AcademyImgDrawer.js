import React, { useState, useEffect } from 'react';
import './AcademyImgDrawer.css';

const AcademyImgDrawer = ({ images, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  // Update selectedImage when images change
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div className={`image-drawer-popup ${isOpen ? 'open' : ''}`}>
      <div className="image-drawer-content">
        <button className="close-button" onClick={onClose}>X</button>
        {selectedImage && <img src={selectedImage} alt="Selected" className="main-image" />}
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademyImgDrawer;
