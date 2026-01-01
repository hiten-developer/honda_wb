import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllBikes, getBikeImages, API_BASE_URL } from "../../services/api";
import "../../styles/Home/pickbike.css";

const PickBike = () => {
  const [bikesData, setBikesData] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bikes = await getAllBikes();
        const images = await getBikeImages();

        const formatted = bikes.map((bike) => {
          const img = images.find((i) => i.bike_id === bike._id);
          const variant = bike.variants?.[0] || {};

          return {
            id: bike._id,
            name: bike.model_name || "hiten",
            model: bike.segment || "hiten",
            price: variant.ex_showroom_price
              ? `₹ ${variant.ex_showroom_price.toLocaleString("en-IN")}`
              : "hiten",
            image: img
              ? `${API_BASE_URL}/uploads/${img.s3Key}`
              : "https://via.placeholder.com/300x200?text=Bike",
            engine: variant.engine_type || "hiten",
            fuelCapacity: variant.fuel_tank_l || "hiten",
            brakes: `${variant.brakes_front || "hiten"} / ${
              variant.brakes_rear || "hiten"
            }`,
          };
        });

        setBikesData(formatted);
        setSelectedBike(formatted[0]);
      } catch (err) {
        console.error(err);
        setBikesData([]);
        setSelectedBike(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.city) {
      alert("Please fill all details");
      return;
    }

    setPurchaseSuccess(true);
    setTimeout(() => {
      setShowPurchaseForm(false);
      setPurchaseSuccess(false);
      setFormData({ name: "", phone: "", city: "" });
    }, 2000);
  };

  if (loading || !selectedBike) {
    return (
      <section className="pick-bike-simple">
        <h2 className="simple-title">Pick a Bike to Start</h2>
        <div className="loading-container">
          <h3>Loading bikes...</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="pick-bike-simple">
      <h2 className="simple-title">Pick a Bike to Start</h2>

      <div className="simple-container">
        <div className="bike-names-list">
          <h3 className="desktop-only">All Bikes</h3>

          <div
            className="mobile-dropdown-header"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{selectedBike.name}</span>
            <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
          </div>

          <div className={`names-scroll ${dropdownOpen ? "open" : ""}`}>
            {bikesData.map((bike) => (
              <div
                key={bike.id}
                className={`name-item ${
                  selectedBike.id === bike.id ? "active" : ""
                }`}
                onClick={() => handleSelectBike(bike)}
              >
                <h4>{bike.name}</h4>
                <p>{bike.model}</p>
                <span className="price">{bike.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bike-details-box">
          <h3>Selected Bike</h3>

          <div className="details-box">
            <div className="bike-image-box">
              <img src={selectedBike.image} alt={selectedBike.name} />
            </div>

            <div className="bike-info-box">
              <h2>{selectedBike.name}</h2>
              <p className="model">{selectedBike.model}</p>
              <p className="price-big">{selectedBike.price}</p>

              <div className="specs-box">
                <div className="spec">
                  <span>Engine</span>
                  <span>{selectedBike.engine}</span>
                </div>
                <div className="spec">
                  <span>Fuel Capacity</span>
                  <span>{selectedBike.fuelCapacity}</span>
                </div>
                <div className="spec">
                  <span>Brakes</span>
                  <span>{selectedBike.brakes}</span>
                </div>
              </div>

              <div className="buttons-box">
                <button
                  className="btn-price"
                  onClick={() => setShowPurchaseForm(true)}
                >
                  Get On Road Price
                </button>

                <NavLink to={`/bike/${selectedBike.id}`}>
                  <button className="btn-details">View More Details</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- PURCHASE MODAL -------- */}
      {showPurchaseForm && (
        <div className="purchase-overlay">
          <div className="purchase-modal">
            {!purchaseSuccess ? (
              <>
                <h3>Purchase {selectedBike.name}</h3>
                <form onSubmit={handlePurchaseSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />

                  <div className="modal-buttons">
                    <button type="submit" className="btn-price">
                      Confirm Purchase
                    </button>
                    <button
                      type="button"
                      className="btn-details"
                      onClick={() => setShowPurchaseForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="success-box">
                <h3>🎉 Purchase Successful!</h3>
                <p>Our team will contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PickBike;
