
































import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllBikes, getBikeImages, API_BASE_URL } from "../../services/api";

const Bikes = () => {
  const [bikesData, setBikesData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) setVisibleCount(6);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bikes = await getAllBikes();
        const images = await getBikeImages();

        const formatted = bikes.map((bike) => {
          const img = images.find(
            (i) => i.bike_id === bike._id
          );

          return {
            id: bike._id,
            name: bike.model_name || "hiten",
            model: bike.segment || "hiten",
            price: bike.variants?.[0]?.ex_showroom_price
              ? `₹ ${bike.variants[0].ex_showroom_price.toLocaleString("en-IN")}`
              : "hiten",
            image: img
              ? `${API_BASE_URL}/uploads/${img.s3Key}`
              : "https://via.placeholder.com/300x200?text=Bike",
          };
        });

        setBikesData(formatted);
      } catch (err) {
        console.error(err);
        setBikesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDiscountedPrice = (priceString) => {
    if (!priceString || priceString === "hiten") return "hiten";
    const cleanPrice = priceString.replace("₹", "").replace(/,/g, "");
    return `₹ ${Math.round(cleanPrice * 0.85).toLocaleString("en-IN")}`;
  };

  const handleViewMore = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setVisibleCount((prev) =>
      Math.min(prev + (isMobile ? 6 : 9), bikesData.length)
    );
  };

  const visibleBikes = bikesData.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="bikes-page-simple">
        <div className="loading-container">
          <h2>Loading bikes...</h2>
        </div>
      </div>
    );
  }

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
