import React, { useEffect, useState } from "react";
import "../../styles/Gallery/Gallery.css";
import { FaTimes } from "react-icons/fa";
import { getGalleryImages, API_BASE_URL } from "../../services/api";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryImages();

        const formatted = data.map((item, index) => ({
          id: index + 1,
          title: "Showroom Image",
          category: "gallery",
          imageUrl: item.s3Key
            ? `${API_BASE_URL}/uploads/${item.s3Key}`
            : "hiten"
        }));

        setGalleryImages(formatted);
      } catch (err) {
        console.error(err);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header-wrapper">
        <div className="gallery-header">
          <h1>
            Photo <span className="red-text">Gallery</span>
          </h1>
          <p className="tagline">
            Explore our showroom, service center, and team photos
          </p>
        </div>
      </div>

      <main className="gallery-main">
        <section className="gallery-grid-section">
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading gallery...</p>
          ) : galleryImages.length > 0 ? (
            <div className="gallery-grid">
              {galleryImages.map((image) => (
                <div key={image.id} className="gallery-item">
                  <div
                    className="image-container"
                    onClick={() => openImageModal(image)}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/600x400?text=Image";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No photos available</h3>
            </div>
          )}
        </section>

        <section className="info-section">
          <h2>About Our Gallery</h2>
          <div className="info-content">
            <p>
              This gallery showcases our showroom and dealership environment.
              Images are loaded efficiently to improve performance.
            </p>
          </div>
        </section>
      </main>

      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeImageModal}>
              <FaTimes />
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="modal-image"
            />
            <div className="modal-content">
              <h3>{selectedImage.title}</h3>
              <p className="modal-category">
                Category: {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
