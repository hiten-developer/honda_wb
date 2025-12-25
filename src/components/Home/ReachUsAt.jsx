import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ReachUsAt = () => {
  const contactData = {
    showroom: {
      title: "Showroom",
      name: "MADHIKA Honda",
      address: "Anand,Gujarat",
      city: "Anand,Gujarat",
      contact: "9510796171",
      email: "hiten@gmail.com"
    },
    workshop: {
      title: "Workshop", 
      name: "MADHIKA Honda",
      address: "Anand,Gujarat",
      city: "Anand,Gujarat",
      contact: "951079174",
      email: "hiten@gmail.com"
    }
  };

  return (
    <section className="reach-us-section">
      <div className="reach-us-container">
        <h2 className="section-heading">Reach Us At</h2>
        
        <div className="contact-cards">
          <div className="contact-card">
            <h3 className="card-title">{contactData.showroom.title}</h3>
            <div className="card-content">
              <div className="info-item">
                <FaMapMarkerAlt className="icon" />
                <div className="info-text">
                  <p className="business-name">{contactData.showroom.name}</p>
                  <p className="address">{contactData.showroom.address}</p>
                  <p className="city">{contactData.showroom.city}</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaPhoneAlt className="icon" />
                <div className="info-text">
                  <p className="contact">Contact: <span>{contactData.showroom.contact}</span></p>
                </div>
              </div>
              
              <div className="info-item">
                <FaEnvelope className="icon" />
                <div className="info-text">
                  <p className="email">Email: <span>{contactData.showroom.email}</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-card">
            <h3 className="card-title">{contactData.workshop.title}</h3>
            <div className="card-content">
              <div className="info-item">
                <FaMapMarkerAlt className="icon" />
                <div className="info-text">
                  <p className="business-name">{contactData.workshop.name}</p>
                  <p className="address">{contactData.workshop.address}</p>
                  <p className="city">{contactData.workshop.city}</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaPhoneAlt className="icon" />
                <div className="info-text">
                  <p className="contact">Contact: <span>{contactData.workshop.contact}</span></p>
                </div>
              </div>
              
              <div className="info-item">
                <FaEnvelope className="icon" />
                <div className="info-text">
                  <p className="email">Email: <span>{contactData.workshop.email}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReachUsAt;