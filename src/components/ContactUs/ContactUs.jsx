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
//     <div className="contact-us-container">
//       <div className="contact-header">
//         <h1>
//           Contact <span className="red-text">Madhika Honda</span>
//         </h1>
//         <p className="tagline">We're here to help you. Send us a message!</p>
//       </div>

//       {/* Main Form Section */}
//       <div className="contact-main">
//         <div className="contact-form-wrapper">
//           {/* Contact Form - Always visible */}
//           <form className="contact-form" onSubmit={handleSubmit}>
//             <h2>Get In Touch</h2>

//             {/* Name Field */}
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

//             {/* Email Field */}
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

//             {/* Phone Field */}
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

//             {/* Subject Dropdown */}
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

//             {/* Message Field */}
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

//             {/* Submit Button */}
//             <button type="submit" className="submit-btn">
//               Send Message
//             </button>

//             <p className="form-note">All fields marked with * are required</p>

//             {/* Small Success Message Below Form */}
//             {isSubmitted && (
//               <div className="small-success-message">
//                 <div className="success-check">✓</div>
//                 <span className="success-text">Message sent successfully!</span>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Simple Contact Info with Icons in Red Circles */}
//         <div className="simple-contact-info">
//           <h3>Contact Information</h3>
//           <div className="contact-row">
//             <div className="contact-item">
//               <p>
//                 <strong>Address:</strong> 123 Auto Street, City
//               </p>
//             </div>
//             <div className="contact-item">
//               <p>
//                 <strong>Phone:</strong> +91 98765 43210
//               </p>
//             </div>
//           </div>
//           <div className="contact-row">
//             <div className="contact-item">
//               <p>
//                 <strong>Email:</strong> contact@madhikahonda.com
//               </p>
//             </div>
//             <div className="contact-item">
//               <p>
//                 <strong>Hours:</strong> Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
import React, { useState } from "react";
import "../../styles/ContactUs/ContactUs.css";

const ContactUs = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "general"
  });

  // State to track if form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show success message
    setIsSubmitted(true);
    
    // In real app, here you would send data to server
    console.log("Form Data:", formData);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "general"
      });
    }, 3000);
  };

  return (
    <div className="contact-container">
      {/* Header Section - Same as AboutUs */}
      <div className="contact-header-wrapper">
        <div className="contact-header">
          <h1>
            Contact <span className="red-text">Madhika Honda</span>
          </h1>
          <p className="tagline">Get in touch with our team</p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="contact-main">
        <div className="contact-form-wrapper">
          {/* Contact Form - Always visible */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Get In Touch</h2>
            
            {/* Name Field */}
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

            {/* Email Field */}
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

            {/* Phone Field */}
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

            {/* Subject Dropdown */}
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

            {/* Message Field */}
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

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Send Message
            </button>

            <p className="form-note">
              All fields marked with * are required
            </p>

            {/* Small Success Message Below Form */}
            {isSubmitted && (
              <div className="small-success-message">
                <div className="success-check">✓</div>
                <span className="success-text">Message sent successfully!</span>
              </div>
            )}
          </form>
        </div>

        {/* Simple Contact Info WITHOUT icon boxes */}
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