import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllBikes } from "../services/api";

import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [footerBikes, setFooterBikes] = useState([]);

  useEffect(() => {
    const fetchFooterBikes = async () => {
      try {
        const bikes = await getAllBikes();
        setFooterBikes(bikes.slice(0, 6));
      } catch (error) {
        console.error(error);
        setFooterBikes([]);
      }
    };

    fetchFooterBikes();
  }, []);

  return (
    <footer className="honda-footer">
      <div className="footer-wrapper">
        <h2 className="footer-main-heading">Madhika Honda</h2>

        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-column-title">HONDA BIKES</h3>
            <ul className="footer-bikes-list">
              {footerBikes.map((bike) => (
                <li key={bike._id}>
                  <NavLink to={`/bike/${bike._id}`} className="bike-link">
                    {bike.model_name || "hiten"}
                  </NavLink>
                </li>
              ))}

              <li>
                <NavLink to="/bikes" className="more-link">
                  More ...
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-column">
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
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
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

// Static Data Code

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaEnvelope,
// } from "react-icons/fa";

// const staticFooterBikes = [
//   { id: "1", name: "Honda Activa 6G" },
//   { id: "2", name: "Honda SP 125" },
//   { id: "3", name: "Honda Shine" },
//   { id: "4", name: "Honda Hornet 2.0" },
//   { id: "5", name: "Honda CB300R" },
//   { id: "6", name: "Honda CB200X" },
// ];

// const Footer = () => {
//   return (
//     <footer className="honda-footer">
//       <div className="footer-wrapper">
//         <h2 className="footer-main-heading">Madhika Honda</h2>

//         <div className="footer-main">
//           <div className="footer-column">
//             <h3 className="footer-column-title">HONDA BIKES</h3>
//             <ul className="footer-bikes-list">
//               {staticFooterBikes.map((bike) => (
//                 <li key={bike.id}>
//                   <NavLink to={`/bike/${bike.id}`} className="bike-link">
//                     {bike.name}
//                   </NavLink>
//                 </li>
//               ))}
//               <li>
//                 <NavLink to="/bikes" className="more-link">
//                   More ...
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           <div className="footer-column">
//             <h3 className="footer-column-title">Quick Links</h3>
//             <ul className="footer-links">
//               <NavLink to="/">Home</NavLink>
//               <NavLink to="/bikes">New Bikes</NavLink>
//               <NavLink to="/outlets">Outlets</NavLink>
//               <NavLink to="/service">Service</NavLink>
//               <NavLink to="/about">About Us</NavLink>
//               <NavLink to="/contact">Contact Us</NavLink>
//             </ul>
//           </div>

//           <div className="footer-column">
//             <h3 className="footer-column-title">ABOUT US</h3>
//             <ul className="footer-links">
//               <li>
//                 <NavLink to="/gallery">Gallery</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/contact">Contact Us</NavLink>
//               </li>
//             </ul>
//           </div>

//           <div className="footer-column">
//             <h3 className="footer-column-title">FOLLOW US</h3>
//             <div className="social-icons-footer">
//               <a href="#" className="social-link">
//                 <FaFacebookF />
//               </a>
//               <a href="#" className="social-link">
//                 <FaInstagram />
//               </a>
//             </div>

//             <div className="footer-contact">
//               <p><FaMapMarkerAlt /> Anand, Gujarat</p>
//               <br />
//               <p><FaPhoneAlt /> +91 9510796171</p>
//               <br />
//               <p><FaEnvelope /> hiten@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <div className="copyright-section">
//             <p className="copyright-text">
//               Powered by <span className="company-name">Universal Auto Products</span>
//             </p>
//             <p className="copyright-year">
//               © 2025 Universal Honda. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;