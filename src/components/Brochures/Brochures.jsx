import React from "react";
import "../../styles/Brochures/Brochures.css";
import { FaDownload, FaFilePdf } from "react-icons/fa";

const Brochures = () => {
  // Sample brochures data - later will come from API
  const brochuresData = [
    {
      id: 1,
      title: "Honda Activa 6G Brochure",
      category: "Scooter",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 2,
      title: "Honda Dio Brochure",
      category: "Scooter",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 3,
      title: "Honda CB Shine Brochure",
      category: "Motorcycle",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 4,
      title: "Honda SP 125 Brochure",
      category: "Motorcycle",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 5,
      title: "Honda Hornet Brochure",
      category: "Motorcycle",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 6,
      title: "Honda X-Blade Brochure",
      category: "Motorcycle",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 7,
      title: "Service Center Brochure",
      category: "Service",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    },
    {
      id: 8,
      title: "Finance Options Brochure",
      category: "Finance",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      date: "2023"
    }
  ];

  return (
    <div className="brochures-container">
      {/* Header Section */}
      <div className="brochures-header-wrapper">
        <div className="brochures-header">
          <h1>
            Download <span className="red-text">Brochures</span>
          </h1>
          <p className="tagline">Get detailed information about our products and services</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="brochures-main">
        {/* Brochures List - One per row */}
        <section className="brochures-list-section">
          <div className="brochures-list">
            {brochuresData.map(brochure => (
              <div key={brochure.id} className="brochure-item">
                {/* PDF Icon */}
                <div className="pdf-icon">
                  <FaFilePdf />
                </div>

                {/* Brochure Details */}
                <div className="brochure-content">
                  <h3>{brochure.title}</h3>
                  <div className="brochure-meta">
                    <span className="category">{brochure.category}</span>
                    <span className="date">{brochure.date}</span>
                  </div>
                </div>

                {/* Download Button */}
                <div className="brochure-action">
                  <a 
                    href={brochure.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="download-btn"
                  >
                    <FaDownload /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note Section */}
        <section className="note-section">
          <p>
            <strong>Note:</strong> All brochures are in PDF format. 
            You can view them in your browser or download for future reference.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Brochures;