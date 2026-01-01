// import React, { useState } from "react";
// import "../../styles/ContactUs/ContactUs.css";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     subject: "general",
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setIsSubmitted(true);

//     console.log("Form Data:", formData);

//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         message: "",
//         subject: "general",
//       });
//     }, 3000);
//   };

//   return (
//     <div className="contact-container">
//       <div className="contact-header-wrapper">
//         <div className="contact-header">
//           <h1>
//             Contact <span className="red-text">Madhika Honda</span>
//           </h1>
//           <p className="tagline">Get in touch with our team</p>
//         </div>
//       </div>

//       <div className="contact-main">
//         <div className="contact-form-wrapper">
//           <form className="contact-form" onSubmit={handleSubmit}>
//             <h2>Get In Touch</h2>

//             <div className="form-group">
//               <label htmlFor="name">Full Name *</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email Address *</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="phone">Phone Number *</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="subject">Subject</label>
//               <select
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//               >
//                 <option value="general">General Inquiry</option>
//                 <option value="sales">Vehicle Sales</option>
//                 <option value="service">Service & Maintenance</option>
//                 <option value="parts">Parts & Accessories</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Your Message *</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="How can we help you?"
//                 rows="6"
//                 required
//               ></textarea>
//             </div>

//             <button type="submit" className="submit-btn">
//               Send Message
//             </button>

//             <p className="form-note">All fields marked with * are required</p>

//             {isSubmitted && (
//               <div className="small-success-message">
//                 <div className="success-check">✓</div>
//                 <span className="success-text">Message sent successfully!</span>
//               </div>
//             )}
//           </form>
//         </div>

//         <div className="contact-info-section">
//           <h2>Contact Information</h2>
//           <div className="contact-info">
//             <p>
//               <strong>Address:</strong> 123 Auto Street, City
//             </p>
//             <p>
//               <strong>Phone:</strong> +91 98765 43210
//             </p>
//             <p>
//               <strong>Email:</strong> contact@madhikahonda.com
//             </p>
//             <p>
//               <strong>Hours:</strong> Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;


import React, { useState } from "react";
import "../../styles/ContactUs/ContactUs.css";
import { sendContactMessage } from "../../services/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "general",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await sendContactMessage(formData);

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "general",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header-wrapper">
        <div className="contact-header">
          <h1>
            Contact <span className="red-text">Madhika Honda</span>
          </h1>
          <p className="tagline">Get in touch with our team</p>
        </div>
      </div>

      <div className="contact-main">
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Get In Touch</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
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
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="general">General Inquiry</option>
                <option value="sales">Vehicle Sales</option>
                <option value="service">Service & Maintenance</option>
                <option value="parts">Parts & Accessories</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            <p className="form-note">
              All fields marked with * are required
            </p>

            {isSubmitted && (
              <div className="small-success-message">
                <div className="success-check">✓</div>
                <span className="success-text">
                  Message sent successfully!
                </span>
              </div>
            )}

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </form>
        </div>

        <div className="contact-info-section">
          <h2>Contact Information</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
