import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import bikesData from "../../data/bikesData";
import bikeDetailsData from "../../data/bikeDetailsData";
import "../../styles/BikeDetails/BikeDetails.css";

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [bikeDetails, setBikeDetails] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

  useEffect(() => {
    const foundBike = bikesData.find((b) => b.id === parseInt(id));
    setBike(foundBike);

    const foundDetails = bikeDetailsData.find(
      (detail) => detail.id === parseInt(id)
    );
    setBikeDetails(foundDetails);

    if (foundDetails && foundDetails.colors.length > 0) {
      setSelectedColor(foundDetails.colors[0]);
    }
  }, [id]);

  const getDiscountedPrice = (priceString) => {
    if (!priceString) return "";
    const cleanPrice = priceString.replace("₹", "").replace(/,/g, "");
    const priceNumber = parseFloat(cleanPrice);
    const discounted = priceNumber * 0.85;
    return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
  };

  if (!bike) {
    return (
      <div className="bike-details-page">
        <div className="loading-container">
          <h2>Bike not found!</h2>
          <button
            className="back-to-bikes-btn"
            onClick={() => navigate("/bikes")}
          >
            Back to Bikes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bike-details-page">
      <div className="back-button-section">
        <button
          className="back-to-bikes-btn"
          onClick={() => navigate("/bikes")}
        >
          Back to Bikes
        </button>
      </div>

      <div className="bike-header">
        <div className="bike-main-info">
          <h1 className="bike-detail-name">{bike.name}</h1>
          <p className="bike-detail-model">{bike.model}</p>
          <div className="bike-price-tag">
            <span className="original-price-tag">{bike.price}</span>
            <span className="discounted-price-tag">
              {getDiscountedPrice(bike.price)}
            </span>
          </div>
        </div>
        <div className="get-bike-top">
          <button className="get-bike-btn">Get This Bike</button>
        </div>
      </div>

      <div className="mobile-section-dropdown">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="section-select"
        >
          <option value="overview">Overview</option>
          <option value="specifications">Specifications</option>
          <option value="colors">Colors</option>
          <option value="price">Price</option>
          <option value="gallery">Gallery</option>
        </select>
      </div>

      <div className="section-buttons">
        <button
          className={`section-btn ${
            activeSection === "overview" ? "active" : ""
          }`}
          onClick={() => setActiveSection("overview")}
        >
          Overview
        </button>
        <button
          className={`section-btn ${
            activeSection === "specifications" ? "active" : ""
          }`}
          onClick={() => setActiveSection("specifications")}
        >
          Specifications
        </button>
        <button
          className={`section-btn ${
            activeSection === "colors" ? "active" : ""
          }`}
          onClick={() => setActiveSection("colors")}
        >
          Colors
        </button>
        <button
          className={`section-btn ${activeSection === "price" ? "active" : ""}`}
          onClick={() => setActiveSection("price")}
        >
          Price
        </button>
        <button
          className={`section-btn ${
            activeSection === "gallery" ? "active" : ""
          }`}
          onClick={() => setActiveSection("gallery")}
        >
          Gallery
        </button>
      </div>

      <div className="section-content">
        {activeSection === "overview" && (
          <div className="overview-section">
            <div className="section-header no-border">
              <h2>Overview</h2>
              <p>Complete details about {bike.name}</p>
            </div>

            <div className="overview-content">
              <div className="overview-image-card">
                <div className="main-bike-image">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Bike+Image";
                      e.target.onerror = null;
                    }}
                  />
                </div>
              </div>

              <div className="overview-details">
                <h3>Key Features</h3>
                {bikeDetails && (
                  <div className="features-grid">
                    {[
                      { label: "Engine", value: bikeDetails.engine },
                      {
                        label: "Fuel Capacity",
                        value: bikeDetails.fuelCapacity,
                      },
                      { label: "Brakes", value: bikeDetails.brakes },
                      { label: "Tyre Type", value: bikeDetails.tyre },
                      { label: "Max Power", value: bikeDetails.maxPower },
                      { label: "Gear Box", value: bikeDetails.gearBox },
                      { label: "Clutch", value: bikeDetails.clutch },
                      { label: "Kerb Weight", value: bikeDetails.kerbWeight },
                      { label: "Steering", value: bikeDetails.steering },
                    ].map((feature, index) => (
                      <div className="feature-item" key={index}>
                        <div className="feature-info">
                          <span className="feature-label">{feature.label}</span>
                          <span className="feature-value">{feature.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="overview-description">
                  <h4>About This Bike</h4>
                  <p>
                    The {bike.name} is a premium offering from Honda, known for
                    its excellent performance, fuel efficiency, and stylish
                    design. Perfect for daily commuting and long rides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "specifications" && (
          <div className="specifications-section">
            <div className="section-header">
              <h2>Technical Specifications</h2>
              <p>Detailed technical information about {bike.name}</p>
            </div>

            <div className="specs-content">
              {bikeDetails && (
                <>
                  {[
                    { title: "Engine", specs: bikeDetails.engineSpecs },
                    { title: "Transmission", specs: bikeDetails.transmission },
                    { title: "Dimensions", specs: bikeDetails.dimensions },
                    {
                      title: "Chassis & Suspension",
                      specs: bikeDetails.chassis,
                    },
                    { title: "Brakes", specs: bikeDetails.brakesSpecs },
                    { title: "Tyres", specs: bikeDetails.tyres },
                    {
                      title: "Other Specifications",
                      specs: {
                        "Kerb Weight": bikeDetails.kerbWeight,
                        Steering: bikeDetails.steering,
                        "Fuel Capacity": bikeDetails.fuelCapacity,
                      },
                    },
                  ].map((group, groupIndex) => (
                    <div className="spec-group" key={groupIndex}>
                      <h3 className="spec-group-title">{group.title}</h3>
                      <div className="spec-grid">
                        {Object.entries(group.specs).map(
                          ([key, value], index) => (
                            <div className="spec-item" key={index}>
                              <span className="spec-label">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                              <span className="spec-value">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {activeSection === "colors" && (
          <div className="colors-section">
            <div className="section-header">
              <h2>Available Colors</h2>
              <p>Choose from our range of premium colors</p>
            </div>

            <div className="colors-content">
              <div className="color-preview-area">
                <div className="selected-color-display">
                  <div className="color-preview-card">
                    <div className="color-preview-image">
                      <div
                        className="color-preview-large"
                        style={{
                          backgroundColor: selectedColor?.code || "#f0f0f0",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="color-info">
                    <h3>{selectedColor?.name || "Select Color"}</h3>
                    <p>
                      The {selectedColor?.name || "selected color"} gives a
                      premium look to your {bike.name}. This color is durable
                      and maintains its shine for years.
                    </p>
                  </div>
                </div>
              </div>

              <div className="color-options-area">
                <h3>All Available Colors</h3>
                <div className="color-options-grid">
                  {bikeDetails?.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`color-option-card ${
                        selectedColor?.name === color.name ? "selected" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <div className="color-option-image">
                        <div
                          className="color-circle"
                          style={{
                            backgroundColor: color.code,
                            border:
                              color.code === "#ffffff"
                                ? "1px solid #ddd"
                                : "none",
                          }}
                          title={color.name}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "price" && (
          <div className="price-section">
            <div className="section-header">
              <h2>Price Details</h2>
              <p>Complete pricing information for {bike.name}</p>
            </div>

            <div className="price-content">
              {bikeDetails?.priceBreakdown ? (
                <div className="price-breakdown-card">
                  <div className="price-summary">
                    <div className="price-main">
                      <span className="price-label-main">On-Road Price</span>
                      <span className="price-value-main">
                        {bikeDetails.priceBreakdown.onRoadPrice}
                      </span>
                    </div>
                    <p className="price-note">
                      Inclusive of all taxes and charges
                    </p>
                  </div>

                  <div className="price-details">
                    <h3>Price Breakdown</h3>
                    <div className="price-breakdown-list">
                      {[
                        {
                          label: "Ex-Showroom Price",
                          value: bikeDetails.priceBreakdown.exShowroomPrice,
                        },
                        {
                          label: "Discounted Price",
                          value: getDiscountedPrice(
                            bikeDetails.priceBreakdown.exShowroomPrice
                          ),
                          discounted: true,
                        },
                        {
                          label: "RTO Charges",
                          value: bikeDetails.priceBreakdown.rto,
                        },
                        {
                          label: "Insurance",
                          value: bikeDetails.priceBreakdown.insurance,
                        },
                        {
                          label: "Total On-Road Price",
                          value: bikeDetails.priceBreakdown.onRoadPrice,
                          total: true,
                        },
                      ].map((item, index) => (
                        <div
                          className={`price-item ${item.total ? "total" : ""}`}
                          key={index}
                        >
                          <span className="price-item-label">{item.label}</span>
                          <span
                            className={`price-item-value ${
                              item.discounted ? "discounted" : ""
                            } ${item.total ? "total-price" : ""}`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="price-cta">
                    <button className="get-bike-btn large">
                      Get This Bike Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-price-info">
                  <p>Price information is not available for this bike.</p>
                  <button className="contact-btn">Contact for Price</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "gallery" && (
          <div className="gallery-section">
            <div className="section-header">
              <h2>Gallery</h2>
              <p>Images of {bike.name} from different angles</p>
            </div>

            <div className="gallery-content">
              <div className="main-gallery-image">
                <img
                  src={
                    bikeDetails?.galleryImages?.[selectedGalleryImage] ||
                    bike.image
                  }
                  alt={`${bike.name} - View ${selectedGalleryImage + 1}`}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Bike+Image";
                    e.target.onerror = null;
                  }}
                />
              </div>

              <div className="gallery-thumbnails">
                {bikeDetails?.galleryImages?.map((img, index) => (
                  <div
                    className={`thumbnail ${
                      selectedGalleryImage === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedGalleryImage(index)}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200?text=View+${
                          index + 1
                        }`;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Us Box */}
      <div className="contact-us-box">
        <div className="contact-us-content">
          <h3>Need Help Choosing?</h3>
          <p>Our experts are ready to help you find the perfect bike</p>
          <NavLink to="/contact" className="contact-us-btn">
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
