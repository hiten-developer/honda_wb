import React, { useState } from "react";
import "../../styles/Home/pickbike.css";

const PurchaseFormModal = ({ bikeName, show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

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
      onClose();
      setPurchaseSuccess(false);
      setFormData({ name: "", phone: "", city: "" });
    }, 2000);
  };

  if (!show) return null;

  return (
    <div className="purchase-overlay">
      <div className="purchase-modal">
        {!purchaseSuccess ? (
          <>
            <h3>Purchase {bikeName}</h3>
            <form onSubmit={handlePurchaseSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="btn-price">
                  Confirm Purchase
                </button>
                <button
                  type="button"
                  className="btn-details"
                  onClick={onClose}
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
  );
};

export default PurchaseFormModal;