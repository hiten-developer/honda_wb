import React, { useState } from "react";
import "../../styles/Faq/FAQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  // FAQ data - This will come from API in future
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What documents are required for vehicle purchase?",
      answer: "You need Aadhar Card, PAN Card, Driving License, Passport size photos, and address proof for vehicle purchase.",
      isOpen: false
    },
    {
      id: 2,
      question: "What is the warranty period for Honda vehicles?",
      answer: "Honda vehicles come with a standard warranty of 3 years or 30,000 km, whichever comes first. Extended warranty options are also available.",
      isOpen: false
    },
    {
      id: 3,
      question: "How often should I service my Honda vehicle?",
      answer: "We recommend servicing your Honda vehicle every 6 months or 3,000 km for scooters and 5,000 km for motorcycles, whichever comes first.",
      isOpen: false
    },
    {
      id: 4,
      question: "What are the available finance options?",
      answer: "We offer various finance options through our banking partners with EMI plans starting from 6 months up to 60 months tenure.",
      isOpen: false
    },
    {
      id: 5,
      question: "How long does insurance claim processing take?",
      answer: "Insurance claims are typically processed within 7-10 working days, depending on the complexity of the claim and documentation.",
      isOpen: false
    },
    {
      id: 6,
      question: "Can I book a test drive online?",
      answer: "Yes, you can book a test drive through our website or by calling our showroom. We'll schedule it at your convenience.",
      isOpen: false
    },
    {
      id: 7,
      question: "What is the delivery time for a new vehicle?",
      answer: "Delivery time is usually 2-3 working days after completing all formalities and payment clearance for vehicles in stock.",
      isOpen: false
    },
    {
      id: 8,
      question: "Do you provide roadside assistance?",
      answer: "Yes, we provide 24/7 roadside assistance for all Honda vehicles. Contact our helpline number for immediate assistance.",
      isOpen: false
    }
  ]);

  // Toggle FAQ open/close
  const toggleFAQ = (id) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
    ));
  };

  // Contact info
  const contactInfo = {
    phone: "+91 98765 43210",
    email: "support@madhikahonda.com",
    workingHours: "Monday - Saturday: 9AM - 8PM"
  };

  return (
    <div className="faq-container">
      {/* Header Section */}
      <div className="faq-header-wrapper">
        <div className="faq-header">
          <h1>
            Frequently Asked <span className="red-text">Questions</span>
          </h1>
          <p className="tagline">Find answers to common questions about our products and services</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="faq-main">
        {/* Introduction */}
        <section className="intro-section">
          <h2>How Can We Help You?</h2>
          <p>
            Browse through our frequently asked questions. If you don't find your answer here, 
            feel free to contact our customer support team.
          </p>
        </section>

        {/* FAQ Accordion */}
        <section className="faq-accordion">
          {faqs.map(faq => (
            <div key={faq.id} className={`faq-item ${faq.isOpen ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <h3>{faq.question}</h3>
                <span className="toggle-icon">
                  {faq.isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              
              {faq.isOpen && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>

            
      </main>
    </div>
  );
};

export default FAQ;