
  

    


    
    



          
                

                

                





import React, { useState, useEffect } from "react";
import "../../styles/Insurance/Insurance.css";
import { FaShieldAlt } from "react-icons/fa";
import { getAllBikes } from "../../services/api";

const Insurance = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleModel: "",
    insuranceType: "new",
    existingPolicy: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bikeModels, setBikeModels] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikes = await getAllBikes();
        const models = bikes.map((bike) => bike.model_name || "hiten");
        setBikeModels(models);
      } catch (err) {
        console.error(err);
        setBikeModels([]);
      }
    };

    fetchBikes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "insuranceType" && value === "new"
        ? { existingPolicy: "" }
        : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    console.log("Insurance form submitted:", formData);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        vehicleModel: "",
        insuranceType: "new",
        existingPolicy: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="insurance-container">
      <div className="insurance-header-wrapper">
        <div className="insurance-header">
          <h1>
            Vehicle <span className="red-text">Insurance</span>
          </h1>
          <p className="tagline">
            Secure your vehicle with comprehensive insurance plans
          </p>
        </div>
      </div>

      <main className="insurance-main">
        <section className="intro-section">
          <div className="intro-content">
            <FaShieldAlt className="intro-icon" />
            <h2>Complete Insurance Solutions</h2>
            <p>
              Protect your Honda vehicle with our comprehensive insurance plans.
              We offer third-party and comprehensive coverage with fast claim
              settlement.
            </p>
          </div>
        </section>

        <section className="inquiry-section">
          <h2>Get Insurance Quote</h2>

          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Request Submitted!</h3>
              <p>Our insurance expert will contact you with the best quote.</p>
            </div>
          ) : (
            <form className="insurance-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Model *</label>
                  <select
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Vehicle</option>
                    {bikeModels.map((model, index) => (
                      <option key={index} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Insurance Type *</label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="new">New Insurance</option>
                    <option value="renewal">Policy Renewal</option>
                    <option value="transfer">Transfer</option>
                    <option value="claim">Claim Assistance</option>
                  </select>
                </div>

                {formData.insuranceType !== "new" && (
                  <div className="form-group">
                    <label>Existing Policy Number *</label>
                    <input
                      type="text"
                      name="existingPolicy"
                      value={formData.existingPolicy}
                      onChange={handleChange}
                      placeholder="Enter policy number"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Additional Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific insurance requirements..."
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Get Insurance Quote
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default Insurance;
