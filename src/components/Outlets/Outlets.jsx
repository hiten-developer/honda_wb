import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Outlets/Outlets.css";

import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaDirections
} from "react-icons/fa";

const outletsData = [
  {
    id: 1,
    name: "Madhika Honda Main Showroom",
    address: "123 Auto Street, City Center",
    phone: "+91 98765 43210",
    email: "main@madhikahonda.com",
    hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
  },
  {
    id: 2,
    name: "Madhika Honda West Branch",
    address: "456 West Avenue, West City",
    phone: "+91 98765 43211",
    email: "west@madhikahonda.com",
    hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
  },
  {
    id: 3,
    name: "Madhika Honda North Showroom",
    address: "789 North Road, North City",
    phone: "+91 98765 43212",
    email: "north@madhikahonda.com",
    hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
  },
  {
    id: 4,
    name: "Madhika Honda Service Center",
    address: "321 Service Lane, Industrial Area",
    phone: "+91 98765 43213",
    email: "service@madhikahonda.com",
    hours: "Mon-Sat: 8AM-7PM, Sun: 9AM-5PM"
  },
  {
    id: 5,
    name: "Madhika Honda South Branch",
    address: "654 South Street, South City",
    phone: "+91 98765 43214",
    email: "south@madhikahonda.com",
    hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
  }
];

const Outlets = () => {
  return (
    <div className="outlets-container">
      <div className="outlets-header-wrapper">
        <div className="outlets-header">
          <h1>
            Our <span className="red-text">Outlets</span>
          </h1>
          <p className="tagline">Visit any of our 5 locations across the city</p>
        </div>
      </div>

      <main className="outlets-main">
        <div className="outlets-grid">
          {outletsData.map((outlet) => (
            <div key={outlet.id} className="outlet-card">
              <div className="outlet-number">
                Outlet #{outlet.id}
              </div>

              <div className="outlet-details">
                <h3>{outlet.name}</h3>
                
                <div className="outlet-info">
                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{outlet.address}</span>
                  </div>
                  
                  <div className="info-item">
                    <FaPhoneAlt className="info-icon" />
                    <span>{outlet.phone}</span>
                  </div>
                  
                  <div className="info-item">
                    <FaEnvelope className="info-icon" />
                    <span>{outlet.email}</span>
                  </div>
                  
                  <div className="info-item">
                    <FaClock className="info-icon" />
                    <span>{outlet.hours}</span>
                  </div>
                </div>

                <div className="outlet-action">
                  <button className="direction-btn">
                    <FaDirections className="btn-icon" /> Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="contact-us-section">
          <h2>Need More Information?</h2>
          <p>Contact us for any queries about our outlets or services</p>
          <Link to="/contact">
            <button className="contact-us-btn">
              Contact Us Now
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Outlets;