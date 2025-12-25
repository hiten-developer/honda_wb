import React from "react";
import { NavLink } from "react-router-dom";

import bikesData from "../data/bikesData";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const footerBikes = bikesData.slice(0, 6);

  return (
    <footer className="honda-footer">
      <div className="footer-wrapper">
        <h2 className="footer-main-heading">Madhika Honda</h2>

        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-column-title">HONDA BIKES</h3>
            <ul className="footer-bikes-list">
              {footerBikes.map((bike) => (
                <li key={bike.id}>
                  <a href={bike.name} className="bike-link">
                    {bike.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/bikes" className="more-link">
                  More ...
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">OUTLETS</h3>
            <ul className="footer-links">
              <li>
                <a href="/showroom">Showroom</a>
              </li>
              <li>
                <a href="/workshops">Workshops</a>
              </li>
            </ul>
          </div>

          <div className="footer-columns">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/bikes">New Bikes</NavLink>
              <NavLink to="/outlets">Outlets</NavLink>
              <NavLink to="/service">Service</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">ABOUT US</h3>
            <ul className="footer-links">
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">FOLLOW US</h3>
            <div className="social-icons-footer">
              <a href="#" className="social-link">
                <FaFacebookF />
              </a>

              <a href="#" className="social-link">
                <FaInstagram />
              </a>
            </div>

            <div className="footer-contact">
              <p>
                <FaMapMarkerAlt /> Anand, Gujarat
              </p>
              <br />
              <p>
                <FaPhoneAlt /> +91 9510796171
              </p>
              <br />
              <p>
                <FaEnvelope /> hiten@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright-section">
            <p className="copyright-text">
              Powered by{" "}
              <span className="company-name">Universal Auto Products</span>
            </p>
            <p className="copyright-year">
              © 2025 Universal Honda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
