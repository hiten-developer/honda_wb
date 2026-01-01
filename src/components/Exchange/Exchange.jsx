import React from "react";
import "../../styles/Exchange/Exchange.css";

const Exchange = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    carModel: "",
    carYear: "",
    mileage: "",
    condition: "good"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you within 24 hours for your exchange valuation.");
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      carModel: "",
      carYear: "",
      mileage: "",
      condition: "good"
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="exchange-container">
      {/* Header Section */}
      <div className="exchange-header-wrapper">
        <div className="exchange-header">
          <h1>
            Vehicle <span className="red-text">Exchange</span>
          </h1>
          <p className="tagline">Get Best Value for Your Old Vehicle</p>
        </div>
      </div>

      <main className="exchange-main">
        {/* Benefits Section */}
        <section className="benefits-section">
          <h2>Why Exchange with Madhika Honda</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">₹</div>
              <h3>Top Value</h3>
              <p>Get the best market price for your old vehicle</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">⚡</div>
              <h3>Quick Process</h3>
              <p>Complete exchange in just 2 hours</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h3>Hassle-Free</h3>
              <p>We handle all paperwork and formalities</p>
            </div>
          </div>
        </section>

        {/* Exchange Form */}
        <section className="exchange-form-section">
          <h2>Get Your Exchange Value</h2>
          <p className="form-subtitle">Fill details below for instant valuation</p>
          
          <form className="exchange-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="carModel">Car Model *</label>
                <input
                  type="text"
                  id="carModel"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Honda City 2018"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="carYear">Manufacturing Year *</label>
                <input
                  type="number"
                  id="carYear"
                  name="carYear"
                  value={formData.carYear}
                  onChange={handleChange}
                  required
                  min="2000"
                  max="2024"
                  placeholder="e.g., 2018"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mileage">Mileage (km) *</label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 45000"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="condition">Vehicle Condition *</label>
              <div className="condition-options">
                {["excellent", "good", "average", "needs-repair"].map((condition) => (
                  <label key={condition} className="condition-option">
                    <input
                      type="radio"
                      name="condition"
                      value={condition}
                      checked={formData.condition === condition}
                      onChange={handleChange}
                    />
                    <span className="condition-label">
                      {condition.charAt(0).toUpperCase() + condition.slice(1).replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Get Instant Valuation
            </button>
          </form>
        </section>
      </main>

      <footer className="exchange-footer">
        <p>© 2025 Madhika Honda. All exchange valuations are valid for 7 days.</p>
        <div className="contact-info">
          <p className="contact-phone">For immediate assistance: <strong>+91 98765 43210</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default Exchange;