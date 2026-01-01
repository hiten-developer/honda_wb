import React, { useState, useEffect } from "react";
import "../../styles/Insurance/Insurance.css";
import { FaShieldAlt, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

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
  
  // Insurance department data - This will come from API
  const [insuranceDept, setInsuranceDept] = useState({
    phone: "+91 98765 43210",
    claimsPhone: "+91 98765 43211",
    email: "insurance@madhikahonda.com",
    claimsEmail: "claims@madhikahonda.com",
    workingHours: "Monday - Saturday: 9AM - 7PM",
    sundayHours: "Sunday: 10AM - 5PM"
  });

  // In real app, you would fetch this from API
  useEffect(() => {
    // Example: Fetch insurance department data
    // fetch('/api/insurance-department')
    //   .then(res => res.json())
    //   .then(data => setInsuranceDept(data));
    
    // For now, using static data
    setInsuranceDept({
      phone: "+91 98765 43210",
      claimsPhone: "+91 98765 43211",
      email: "insurance@madhikahonda.com",
      claimsEmail: "claims@madhikahonda.com",
      workingHours: "Monday - Saturday: 9AM - 7PM",
      sundayHours: "Sunday: 10AM - 5PM"
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // In real app, send data to API
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
      {/* Header Section */}
      <div className="insurance-header-wrapper">
        <div className="insurance-header">
          <h1>
            Vehicle <span className="red-text">Insurance</span>
          </h1>
          <p className="tagline">Secure your vehicle with comprehensive insurance plans</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="insurance-main">
        {/* Introduction */}
        <section className="intro-section">
          <div className="intro-content">
            <FaShieldAlt className="intro-icon" />
            <h2>Complete Insurance Solutions</h2>
            <p>
              Protect your Honda vehicle with our comprehensive insurance plans. 
              We offer third-party and comprehensive coverage with fast claim settlement.
            </p>
          </div>
        </section>

        {/* Insurance Inquiry Form */}
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
                    <option value="Honda Activa">Honda Activa</option>
                    <option value="Honda Dio">Honda Dio</option>
                    <option value="Honda CB Shine">Honda CB Shine</option>
                    <option value="Honda SP 125">Honda SP 125</option>
                    <option value="Honda Hornet">Honda Hornet</option>
                    <option value="Honda X-Blade">Honda X-Blade</option>
                    <option value="Other">Other Model</option>
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
                
                <div className="form-group">
                  <label>Existing Policy Number</label>
                  <input
                    type="text"
                    name="existingPolicy"
                    value={formData.existingPolicy}
                    onChange={handleChange}
                    placeholder="If renewal/transfer"
                  />
                </div>
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

        {/* Contact Info - Fixed Layout */}
        <section className="contact-section">
          <h2>Insurance Department</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h3>Call for Assistance</h3>
                <p><strong>Insurance:</strong> {insuranceDept.phone}</p>
                <p><strong>Claims:</strong> {insuranceDept.claimsPhone}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Email Us</h3>
                <p><strong>General:</strong> {insuranceDept.email}</p>
                <p><strong>Claims:</strong> {insuranceDept.claimsEmail}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaCalendarAlt />
              </div>
              <div className="contact-details">
                <h3>Working Hours</h3>
                <p>{insuranceDept.workingHours}</p>
                <p>{insuranceDept.sundayHours}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Insurance;