// import React, { useState } from "react";
// import "../../styles/Service_Component/Service.css";
// import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from "react-icons/fa";

// const Service = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     vehicleModel: "",
//     servicePackage: "basic",
//     preferredDate: "",
//     message: ""
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const servicePackages = [
//     {
//       id: "basic",
//       name: "Basic Service",
//       price: "₹ 1,500",
//       includes: [
//         "Engine Oil Change",
//         "Oil Filter Replacement",
//         "Basic Checkup",
//         "Air Filter Cleaning"
//       ]
//     },
//     {
//       id: "standard",
//       name: "Standard Service",
//       price: "₹ 3,000",
//       includes: [
//         "All Basic Service Items",
//         "Brake Inspection",
//         "Chain Lubrication",
//         "Battery Check",
//         "Tyre Pressure Check"
//       ]
//     },
//     {
//       id: "premium",
//       name: "Premium Service",
//       price: "₹ 5,000",
//       includes: [
//         "All Standard Service Items",
//         "Full Vehicle Inspection",
//         "Brake Pad Replacement",
//         "Spark Plug Change",
//         "Complete Wash"
//       ]
//     }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
    
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         vehicleModel: "",
//         servicePackage: "basic",
//         preferredDate: "",
//         message: ""
//       });
//     }, 3000);
//   };

//   return (
//     <div className="service-container">
//       <div className="service-header-wrapper">
//         <div className="service-header">
//           <h1>
//             Service <span className="red-text">Center</span>
//           </h1>
//           <p className="tagline">Expert care for your Honda vehicle</p>
//         </div>
//       </div>

//       <main className="service-main">
//         <section className="intro-section">
//           <h2>Professional Honda Service</h2>
//           <p>
//             At Madhika Honda Service Center, we provide expert maintenance and repair services 
//             using genuine Honda parts and trained technicians.
//           </p>
//         </section>

//         <section className="booking-section">
//           <h2>Book Service Appointment</h2>
          
//           {isSubmitted ? (
//             <div className="success-message">
//               <div className="success-icon">✓</div>
//               <h3>Appointment Booked!</h3>
//               <p>Your service request has been submitted. We'll confirm shortly.</p>
//             </div>
//           ) : (
//             <form className="booking-form" onSubmit={handleSubmit}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Full Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Phone Number *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Vehicle Model *</label>
//                   <select
//                     name="vehicleModel"
//                     value={formData.vehicleModel}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Vehicle</option>
//                     <option value="Honda Activa">Honda Activa</option>
//                     <option value="Honda Dio">Honda Dio</option>
//                     <option value="Honda CB Shine">Honda CB Shine</option>
//                     <option value="Honda SP 125">Honda SP 125</option>
//                     <option value="Honda Hornet">Honda Hornet</option>
//                     <option value="Honda X-Blade">Honda X-Blade</option>
//                     <option value="Other">Other Model</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Select Service Package *</label>
//                   <select
//                     name="servicePackage"
//                     value={formData.servicePackage}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="basic">Basic Service - ₹ 1,500</option>
//                     <option value="standard">Standard Service - ₹ 3,000</option>
//                     <option value="premium">Premium Service - ₹ 5,000</option>
//                   </select>
//                 </div>
                
//                 <div className="form-group">
//                   <label>Preferred Date *</label>
//                   <input
//                     type="date"
//                     name="preferredDate"
//                     value={formData.preferredDate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Additional Details</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Describe the issue or any special requirements..."
//                   rows="3"
//                 ></textarea>
//               </div>

//               {/* Service Package Details Display */}
//               <div className="selected-package-details">
//                 <h3>Selected Package: {servicePackages.find(pkg => pkg.id === formData.servicePackage)?.name}</h3>
//                 <p className="package-price">Price: {servicePackages.find(pkg => pkg.id === formData.servicePackage)?.price}</p>
//                 <div className="package-includes">
//                   <h4>Includes:</h4>
//                   <ul>
//                     {servicePackages.find(pkg => pkg.id === formData.servicePackage)?.includes.map((item, index) => (
//                       <li key={index}>✓ {item}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <button type="submit" className="submit-btn">
//                 Book Appointment
//               </button>
//             </form>
//           )}
//         </section>

//         {/* Service Center Info */}
//         <section className="center-info-section">
//           <h2>Service Center Information</h2>
          
//           <div className="info-grid">
//             <div className="info-card">
//               <div className="info-icon">
//                 <FaMapMarkerAlt />
//               </div>
//               <div>
//                 <h3>Address</h3>
//                 <p>123 Auto Street, City</p>
//                 <p>Near Highway Road</p>
//               </div>
//             </div>

//             <div className="info-card">
//               <div className="info-icon">
//                 <FaPhone />
//               </div>
//               <div>
//                 <h3>Contact</h3>
//                 <p>Service: +91 98765 43210</p>
//                 <p>Emergency: +91 98765 43211</p>
//               </div>
//             </div>

//             <div className="info-card">
//               <div className="info-icon">
//                 <FaClock />
//               </div>
//               <div>
//                 <h3>Working Hours</h3>
//                 <p>Monday - Saturday: 8AM - 8PM</p>
//                 <p>Sunday: 9AM - 6PM</p>
//               </div>
//             </div>

//             <div className="info-card">
//               <div className="info-icon">
//                 <FaEnvelope />
//               </div>
//               <div>
//                 <h3>Email</h3>
//                 <p>service@madhikahonda.com</p>
//                 <p>support@madhikahonda.com</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Service;

import React, { useEffect, useState } from "react";
import "../../styles/Service_Component/Service.css";
import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from "react-icons/fa";
import { getAllBikes } from "../../services/api";

const Service = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleModel: "",
    servicePackage: "basic",
    preferredDate: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bikeModels, setBikeModels] = useState([]);

  // Service packages (STATIC – business rule)
  const servicePackages = [
    {
      id: "basic",
      name: "Basic Service",
      price: "₹ 1,500",
      includes: [
        "Engine Oil Change",
        "Oil Filter Replacement",
        "Basic Checkup",
        "Air Filter Cleaning"
      ]
    },
    {
      id: "standard",
      name: "Standard Service",
      price: "₹ 3,000",
      includes: [
        "All Basic Service Items",
        "Brake Inspection",
        "Chain Lubrication",
        "Battery Check",
        "Tyre Pressure Check"
      ]
    },
    {
      id: "premium",
      name: "Premium Service",
      price: "₹ 5,000",
      includes: [
        "All Standard Service Items",
        "Full Vehicle Inspection",
        "Brake Pad Replacement",
        "Spark Plug Change",
        "Complete Wash"
      ]
    }
  ];

  /* ---------- FETCH BIKE MODELS ---------- */
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikes = await getAllBikes();
        const models = bikes.map((bike) => bike.model_name || "hiten");
        setBikeModels(models);
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
      [name]: value
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
        vehicleModel: "",
        servicePackage: "basic",
        preferredDate: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="service-container">
      {/* Header Section */}
      <div className="service-header-wrapper">
        <div className="service-header">
          <h1>
            Service <span className="red-text">Center</span>
          </h1>
          <p className="tagline">Expert care for your Honda vehicle</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="service-main">
        {/* Introduction */}
        <section className="intro-section">
          <h2>Professional Honda Service</h2>
          <p>
            At Madhika Honda Service Center, we provide expert maintenance and
            repair services using genuine Honda parts and trained technicians.
          </p>
        </section>

        {/* Service Booking Form */}
        <section className="booking-section">
          <h2>Book Service Appointment</h2>

          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Appointment Booked!</h3>
              <p>Your service request has been submitted. We'll confirm shortly.</p>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
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
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>

                {/* 🔥 VEHICLE MODEL – NOW API DRIVEN */}
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
                  <label>Select Service Package *</label>
                  <select
                    name="servicePackage"
                    value={formData.servicePackage}
                    onChange={handleChange}
                    required
                  >
                    <option value="basic">Basic Service - ₹ 1,500</option>
                    <option value="standard">Standard Service - ₹ 3,000</option>
                    <option value="premium">Premium Service - ₹ 5,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Additional Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the issue or any special requirements..."
                  rows="3"
                ></textarea>
              </div>

              {/* Selected Package Details */}
              <div className="selected-package-details">
                <h3>
                  Selected Package:{" "}
                  {
                    servicePackages.find(
                      (pkg) => pkg.id === formData.servicePackage
                    )?.name
                  }
                </h3>
                <p className="package-price">
                  Price:{" "}
                  {
                    servicePackages.find(
                      (pkg) => pkg.id === formData.servicePackage
                    )?.price
                  }
                </p>
                <div className="package-includes">
                  <h4>Includes:</h4>
                  <ul>
                    {servicePackages
                      .find((pkg) => pkg.id === formData.servicePackage)
                      ?.includes.map((item, index) => (
                        <li key={index}>✓ {item}</li>
                      ))}
                  </ul>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Book Appointment
              </button>
            </form>
          )}
        </section>

        {/* Service Center Info */}
        <section className="center-info-section">
          <h2>Service Center Information</h2>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3>Address</h3>
                <p>123 Auto Street, City</p>
                <p>Near Highway Road</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaPhone />
              </div>
              <div>
                <h3>Contact</h3>
                <p>Service: +91 98765 43210</p>
                <p>Emergency: +91 98765 43211</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaClock />
              </div>
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Saturday: 8AM - 8PM</p>
                <p>Sunday: 9AM - 6PM</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div>
                <h3>Email</h3>
                <p>service@madhikahonda.com</p>
                <p>support@madhikahonda.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Service;
