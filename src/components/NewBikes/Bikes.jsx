import React, { useEffect, useState } from "react";
import bikesData from "../../data/bikesData";
import { NavLink } from "react-router-dom";

const Bikes = () => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setVisibleCount(6);
    }
  }, []);

  const getDiscountedPrice = (priceString) => {
    const cleanPrice = priceString.replace("₹", "").replace(/,/g, "");
    const priceNumber = parseFloat(cleanPrice);
    const discounted = priceNumber * 0.85;
    return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
  };

  const handleViewMore = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    setVisibleCount((prev) => {
      if (isMobile) {
        return Math.min(prev + 6, bikesData.length);
      }
      return Math.min(prev + 9, bikesData.length);
    });
  };

  const visibleBikes = bikesData.slice(0, visibleCount);

  return (
    <div className="bikes-page-simple">
      <div className="bikes-heading">
        <h1>New Bikes</h1>
        <p>Explore our latest collection of Honda</p>
      </div>

      <div className="bikes-container">
        <div className="bikes-grid">
          {visibleBikes.map((bike) => (
            <div
              key={bike.id}
              className={`bike-card ${
                hoveredCard === bike.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredCard(bike.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bike-image">
                <NavLink to={`/bike/${bike.id}`}>
                  <img src={bike.image} alt={bike.name} />
                </NavLink>
              </div>

              <div className="bike-info">
                <h3>{bike.name}</h3>
                <p className="bike-model">{bike.model}</p>

                <div className="bike-price">
                  <span className="original-price">{bike.price}</span>
                  <span className="discounted-price">
                    {getDiscountedPrice(bike.price)}
                  </span>
                </div>

                <NavLink to={`/bike/${bike.id}`} className="view-details-btn">
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleCount < bikesData.length && (
        <div className="view-more">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More Bikes
          </button>
        </div>
      )}
    </div>
  );
};

export default Bikes;

