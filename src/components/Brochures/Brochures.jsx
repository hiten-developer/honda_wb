import React, { useEffect, useState } from "react";
import "../../styles/Brochures/Brochures.css";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { getBrochures, API_BASE_URL } from "../../services/api";

const Brochures = () => {
  const [brochuresData, setBrochuresData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const data = await getBrochures();

        const formatted = data.map((item) => ({
          id: item._id,
          title: item.model_name ? `${item.model_name} Brochure` : "hiten",
          category: "Bike",
          pdfUrl: item.image2Key
            ? `${API_BASE_URL}/${item.image2Key}`
            : "hiten",
          date: "2025",
        }));

        setBrochuresData(formatted);
      } catch (err) {
        console.error(err);
        setBrochuresData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  return (
    <div className="brochures-container">
      <div className="brochures-header-wrapper">
        <div className="brochures-header">
          <h1>
            Download <span className="red-text">Brochures</span>
          </h1>
          <p className="tagline">
            Get detailed information about our products and services
          </p>
        </div>
      </div>

      <main className="brochures-main">
        <section className="brochures-list-section">
          <div className="brochures-list">
            {loading ? (
              <p style={{ textAlign: "center" }}>Loading brochures...</p>
            ) : (
              brochuresData.map((brochure) => (
                <div key={brochure.id} className="brochure-item">
                  <div className="pdf-icon">
                    <FaFilePdf />
                  </div>

                  <div className="brochure-content">
                    <h3>{brochure.title}</h3>
                    <div className="brochure-meta">
                      <span className="category">{brochure.category}</span>
                      <span className="date">{brochure.date}</span>
                    </div>
                  </div>

                  <div className="brochure-action">
                    {brochure.pdfUrl !== "hiten" ? (
                      <a
                        href={brochure.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-btn"
                      >
                        <FaDownload /> Download
                      </a>
                    ) : (
                      <span className="download-btn disabled">
                        Not Available
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="note-section">
          <p>
            <strong>Note:</strong> All brochures are in PDF format. You can view
            them in your browser or download for future reference.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Brochures;

// Static Data Code

// import React from "react";
// import "../../styles/Brochures/Brochures.css";
// import { FaDownload, FaFilePdf } from "react-icons/fa";

// const staticBrochuresData = [
//   { id: "1", title: "Honda Activa 6G Brochure", category: "Bike", date: "2025" },
//   { id: "2", title: "Honda SP 125 Brochure", category: "Bike", date: "2025" }
// ];

// const Brochures = () => {
//   return (
//     <div className="brochures-container">
//       <div className="brochures-header-wrapper">
//         <div className="brochures-header">
//           <h1>
//             Download <span className="red-text">Brochures</span>
//           </h1>
//           <p className="tagline">
//             Get detailed information about our products and services
//           </p>
//         </div>
//       </div>

//       <main className="brochures-main">
//         <section className="brochures-list-section">
//           <div className="brochures-list">
//             {staticBrochuresData.map((brochure) => (
//               <div key={brochure.id} className="brochure-item">

//                 <div className="pdf-icon">
//                   <FaFilePdf />
//                 </div>

//                 <div className="brochure-content">
//                   <h3>{brochure.title}</h3>
//                   <div className="brochure-meta">
//                     <span className="category">{brochure.category}</span>
//                     <span className="date">{brochure.date}</span>
//                   </div>
//                 </div>

//                 <div className="brochure-action">
//                   <span className="download-btn disabled">Not Available</span>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="note-section">
//           <p>
//             <strong>Note:</strong> All brochures are in PDF format. You can view
//             them in your browser or download for future reference.
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Brochures;