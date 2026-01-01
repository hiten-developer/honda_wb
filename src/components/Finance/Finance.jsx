import React, { useEffect, useState } from "react";
import "../../styles/Finance/Finance.css";
import { getAllBikes } from "../../services/api";

const Finance = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleModel: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bikeModels, setBikeModels] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikes = await getAllBikes();
        const models = bikes.map((bike) => bike.model_name || "hiten");
        setBikeModels(models);

        if (models.length > 0) {
          setFormData((prev) => ({
            ...prev,
            vehicleModel: models[0],
          }));
        }
      } catch (error) {
        console.error(error);
        setBikeModels([]);
      }
    };

    fetchBikes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        vehicleModel: bikeModels[0] || "",
        message: "",
      });
    }, 3000);
  };

  const loanOptions = [
    { amount: "₹50,000 - ₹1,00,000", rate: "8.5%", tenure: "1-3 years" },
    { amount: "₹1,00,000 - ₹2,00,000", rate: "8.0%", tenure: "1-5 years" },
    { amount: "₹2,00,000 - ₹5,00,000", rate: "7.5%", tenure: "1-7 years" },
    { amount: "₹5,00,000 - ₹10,00,000", rate: "7.0%", tenure: "1-7 years" },
  ];

  return (
    <div className="finance-container">
      <div className="finance-header-wrapper">
        <div className="finance-header">
          <h1>
            Vehicle <span className="red-text">Finance</span>
          </h1>
          <p className="tagline">Easy financing for your Honda vehicle</p>
        </div>
      </div>

      <main className="finance-main">
        <section className="intro-section">
          <h2>Simple & Affordable Financing</h2>
          <p>
            Get the best finance deals for your Honda vehicle with easy EMI
            options, low interest rates, and quick approval process.
          </p>
        </section>

        <section className="loan-section">
          <h2>Our Loan Options</h2>
          <div className="loan-grid">
            {loanOptions.map((loan, index) => (
              <div key={index} className="loan-card">
                <h3>{loan.amount}</h3>
                <div className="loan-details">
                  <p>
                    <strong>Rate:</strong> {loan.rate}
                  </p>
                  <p>
                    <strong>Tenure:</strong> {loan.tenure}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="form-section">
          <h2>Get Finance Assistance</h2>

          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Request Sent!</h3>
              <p>Our finance executive will contact you soon.</p>
            </div>
          ) : (
            <form className="finance-form" onSubmit={handleSubmit}>
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
                <label>Select Vehicle Model</label>
                <select
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                >
                  {bikeModels.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific requirements..."
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Submit Request
              </button>
            </form>
          )}
        </section>

        <section className="contact-section">
          <h2>Finance Department</h2>
          <div className="contact-info">
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Email:</strong> finance@madhikahonda.com
            </p>
            <p>
              <strong>Working Hours:</strong> Mon-Sat: 9AM-7PM
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Finance;
