import React from "react";
import "../../styles/AboutUs/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header-wrapper">
        <div className="about-header">
          <h1>
            About <span className="red-text">Madhika Honda</span>
          </h1>
          <p className="tagline">Trusted Honda Dealership Since 2005</p>
        </div>
      </div>

      <main className="about-main">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Madhika Honda is a leading automobile dealership specializing in
            Honda vehicles. With 18+ years of experience, we provide exceptional
            cars and service to our customers.
          </p>
        </section>

        <section className="features-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <h3>Genuine Parts</h3>
              <p>We use only authentic Honda parts for all services.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <h3>Expert Team</h3>
              <p>Our certified technicians have years of experience.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <h3>Best Service</h3>
              <p>We provide top-notch after-sales support.</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Visit Us</h2>
          <div className="contact-info">
            <p>
              <strong>Address:</strong> 123 Auto Street, City
            </p>
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Email:</strong> contact@madhikahonda.com
            </p>
            <p>
              <strong>Hours:</strong> Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
            </p>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <p>© 2023 Madhika Honda. All rights reserved.</p>
        <button className="contact-btn">Contact Now</button>
      </footer>
    </div>
  );
};

export default AboutUs;
