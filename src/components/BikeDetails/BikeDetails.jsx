// import React, { useEffect, useState } from "react";
// import { useParams, NavLink, useNavigate } from "react-router-dom";
// import bikesData from "../../data/bikesData";
// import bikeDetailsData from "../../data/bikeDetailsData";
// import "../../styles/BikeDetails/BikeDetails.css";

// const BikeDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [bike, setBike] = useState(null);
//   const [bikeDetails, setBikeDetails] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [activeSection, setActiveSection] = useState("overview");
//   const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

//   useEffect(() => {
//     const foundBike = bikesData.find((b) => b.id === parseInt(id));
//     setBike(foundBike);

//     const foundDetails = bikeDetailsData.find(
//       (detail) => detail.id === parseInt(id)
//     );
//     setBikeDetails(foundDetails);

//     if (foundDetails && foundDetails.colors.length > 0) {
//       setSelectedColor(foundDetails.colors[0]);
//     }
//   }, [id]);

//   const getDiscountedPrice = (priceString) => {
//     if (!priceString) return "";
//     const cleanPrice = priceString.replace("₹", "").replace(/,/g, "");
//     const priceNumber = parseFloat(cleanPrice);
//     const discounted = priceNumber * 0.85;
//     return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
//   };

//   if (!bike) {
//     return (
//       <div className="bike-details-page">
//         <div className="loading-container">
//           <h2>Bike not found!</h2>
//           <button
//             className="back-to-bikes-btn"
//             onClick={() => navigate("/bikes")}
//           >
//             Back to Bikes
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bike-details-page">
//       <div className="back-button-section">
//         <button
//           className="back-to-bikes-btn"
//           onClick={() => navigate("/bikes")}
//         >
//           Back to Bikes
//         </button>
//       </div>

//       <div className="bike-header">
//         <div className="bike-main-info">
//           <h1 className="bike-detail-name">{bike.name}</h1>
//           <p className="bike-detail-model">{bike.model}</p>
//           <div className="bike-price-tag">
//             <span className="original-price-tag">{bike.price}</span>
//             <span className="discounted-price-tag">
//               {getDiscountedPrice(bike.price)}
//             </span>
//           </div>
//         </div>
//         <div className="get-bike-top">
//           <button className="get-bike-btn">Get This Bike</button>
//         </div>
//       </div>

//       <div className="mobile-section-dropdown">
//         <select
//           value={activeSection}
//           onChange={(e) => setActiveSection(e.target.value)}
//           className="section-select"
//         >
//           <option value="overview">Overview</option>
//           <option value="specifications">Specifications</option>
//           <option value="colors">Colors</option>
//           <option value="price">Price</option>
//           <option value="gallery">Gallery</option>
//         </select>
//       </div>

//       <div className="section-buttons">
//         <button
//           className={`section-btn ${
//             activeSection === "overview" ? "active" : ""
//           }`}
//           onClick={() => setActiveSection("overview")}
//         >
//           Overview
//         </button>
//         <button
//           className={`section-btn ${
//             activeSection === "specifications" ? "active" : ""
//           }`}
//           onClick={() => setActiveSection("specifications")}
//         >
//           Specifications
//         </button>
//         <button
//           className={`section-btn ${
//             activeSection === "colors" ? "active" : ""
//           }`}
//           onClick={() => setActiveSection("colors")}
//         >
//           Colors
//         </button>
//         <button
//           className={`section-btn ${activeSection === "price" ? "active" : ""}`}
//           onClick={() => setActiveSection("price")}
//         >
//           Price
//         </button>
//         <button
//           className={`section-btn ${
//             activeSection === "gallery" ? "active" : ""
//           }`}
//           onClick={() => setActiveSection("gallery")}
//         >
//           Gallery
//         </button>
//       </div>

//       <div className="section-content">
//         {activeSection === "overview" && (
//           <div className="overview-section">
//             <div className="section-header no-border">
//               <h2>Overview</h2>
//               <p>Complete details about {bike.name}</p>
//             </div>

//             <div className="overview-content">
//               <div className="overview-image-card">
//                 <div className="main-bike-image">
//                   <img
//                     src={bike.image}
//                     alt={bike.name}
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/400x300?text=Bike+Image";
//                       e.target.onerror = null;
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="overview-details">
//                 <h3>Key Features</h3>
//                 {bikeDetails && (
//                   <div className="features-grid">
//                     {[
//                       { label: "Engine", value: bikeDetails.engine },
//                       {
//                         label: "Fuel Capacity",
//                         value: bikeDetails.fuelCapacity,
//                       },
//                       { label: "Brakes", value: bikeDetails.brakes },
//                       { label: "Tyre Type", value: bikeDetails.tyre },
//                       { label: "Max Power", value: bikeDetails.maxPower },
//                       { label: "Gear Box", value: bikeDetails.gearBox },
//                       { label: "Clutch", value: bikeDetails.clutch },
//                       { label: "Kerb Weight", value: bikeDetails.kerbWeight },
//                       { label: "Steering", value: bikeDetails.steering },
//                     ].map((feature, index) => (
//                       <div className="feature-item" key={index}>
//                         <div className="feature-info">
//                           <span className="feature-label">{feature.label}</span>
//                           <span className="feature-value">{feature.value}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="overview-description">
//                   <h4>About This Bike</h4>
//                   <p>
//                     The {bike.name} is a premium offering from Honda, known for
//                     its excellent performance, fuel efficiency, and stylish
//                     design. Perfect for daily commuting and long rides.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === "specifications" && (
//           <div className="specifications-section">
//             <div className="section-header">
//               <h2>Technical Specifications</h2>
//               <p>Detailed technical information about {bike.name}</p>
//             </div>

//             <div className="specs-content">
//               {bikeDetails && (
//                 <>
//                   {[
//                     { title: "Engine", specs: bikeDetails.engineSpecs },
//                     { title: "Transmission", specs: bikeDetails.transmission },
//                     { title: "Dimensions", specs: bikeDetails.dimensions },
//                     {
//                       title: "Chassis & Suspension",
//                       specs: bikeDetails.chassis,
//                     },
//                     { title: "Brakes", specs: bikeDetails.brakesSpecs },
//                     { title: "Tyres", specs: bikeDetails.tyres },
//                     {
//                       title: "Other Specifications",
//                       specs: {
//                         "Kerb Weight": bikeDetails.kerbWeight,
//                         Steering: bikeDetails.steering,
//                         "Fuel Capacity": bikeDetails.fuelCapacity,
//                       },
//                     },
//                   ].map((group, groupIndex) => (
//                     <div className="spec-group" key={groupIndex}>
//                       <h3 className="spec-group-title">{group.title}</h3>
//                       <div className="spec-grid">
//                         {Object.entries(group.specs).map(
//                           ([key, value], index) => (
//                             <div className="spec-item" key={index}>
//                               <span className="spec-label">
//                                 {key.replace(/([A-Z])/g, " $1")}
//                               </span>
//                               <span className="spec-value">{value}</span>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {activeSection === "colors" && (
//           <div className="colors-section">
//             <div className="section-header">
//               <h2>Available Colors</h2>
//               <p>Choose from our range of premium colors</p>
//             </div>

//             <div className="colors-content">
//               <div className="color-preview-area">
//                 <div className="selected-color-display">
//                   <div className="color-preview-card">
//                     <div className="color-preview-image">
//                       <div
//                         className="color-preview-large"
//                         style={{
//                           backgroundColor: selectedColor?.code || "#f0f0f0",
//                         }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div className="color-info">
//                     <h3>{selectedColor?.name || "Select Color"}</h3>
//                     <p>
//                       The {selectedColor?.name || "selected color"} gives a
//                       premium look to your {bike.name}. This color is durable
//                       and maintains its shine for years.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="color-options-area">
//                 <h3>All Available Colors</h3>
//                 <div className="color-options-grid">
//                   {bikeDetails?.colors.map((color, index) => (
//                     <div
//                       key={index}
//                       className={`color-option-card ${
//                         selectedColor?.name === color.name ? "selected" : ""
//                       }`}
//                       onClick={() => setSelectedColor(color)}
//                     >
//                       <div className="color-option-image">
//                         <div
//                           className="color-circle"
//                           style={{
//                             backgroundColor: color.code,
//                             border:
//                               color.code === "#ffffff"
//                                 ? "1px solid #ddd"
//                                 : "none",
//                           }}
//                           title={color.name}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === "price" && (
//           <div className="price-section">
//             <div className="section-header">
//               <h2>Price Details</h2>
//               <p>Complete pricing information for {bike.name}</p>
//             </div>

//             <div className="price-content">
//               {bikeDetails?.priceBreakdown ? (
//                 <div className="price-breakdown-card">
//                   <div className="price-summary">
//                     <div className="price-main">
//                       <span className="price-label-main">On-Road Price</span>
//                       <span className="price-value-main">
//                         {bikeDetails.priceBreakdown.onRoadPrice}
//                       </span>
//                     </div>
//                     <p className="price-note">
//                       Inclusive of all taxes and charges
//                     </p>
//                   </div>

//                   <div className="price-details">
//                     <h3>Price Breakdown</h3>
//                     <div className="price-breakdown-list">
//                       {[
//                         {
//                           label: "Ex-Showroom Price",
//                           value: bikeDetails.priceBreakdown.exShowroomPrice,
//                         },
//                         {
//                           label: "Discounted Price",
//                           value: getDiscountedPrice(
//                             bikeDetails.priceBreakdown.exShowroomPrice
//                           ),
//                           discounted: true,
//                         },
//                         {
//                           label: "RTO Charges",
//                           value: bikeDetails.priceBreakdown.rto,
//                         },
//                         {
//                           label: "Insurance",
//                           value: bikeDetails.priceBreakdown.insurance,
//                         },
//                         {
//                           label: "Total On-Road Price",
//                           value: bikeDetails.priceBreakdown.onRoadPrice,
//                           total: true,
//                         },
//                       ].map((item, index) => (
//                         <div
//                           className={`price-item ${item.total ? "total" : ""}`}
//                           key={index}
//                         >
//                           <span className="price-item-label">{item.label}</span>
//                           <span
//                             className={`price-item-value ${
//                               item.discounted ? "discounted" : ""
//                             } ${item.total ? "total-price" : ""}`}
//                           >
//                             {item.value}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="price-cta">
//                     <button className="get-bike-btn large">
//                       Get This Bike Now
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="no-price-info">
//                   <p>Price information is not available for this bike.</p>
//                   <button className="contact-btn">Contact for Price</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeSection === "gallery" && (
//           <div className="gallery-section">
//             <div className="section-header">
//               <h2>Gallery</h2>
//               <p>Images of {bike.name} from different angles</p>
//             </div>

//             <div className="gallery-content">
//               <div className="main-gallery-image">
//                 <img
//                   src={
//                     bikeDetails?.galleryImages?.[selectedGalleryImage] ||
//                     bike.image
//                   }
//                   alt={`${bike.name} - View ${selectedGalleryImage + 1}`}
//                   onError={(e) => {
//                     e.target.src =
//                       "https://via.placeholder.com/600x400?text=Bike+Image";
//                     e.target.onerror = null;
//                   }}
//                 />
//               </div>

//               <div className="gallery-thumbnails">
//                 {bikeDetails?.galleryImages?.map((img, index) => (
//                   <div
//                     className={`thumbnail ${
//                       selectedGalleryImage === index ? "active" : ""
//                     }`}
//                     key={index}
//                     onClick={() => setSelectedGalleryImage(index)}
//                   >
//                     <img
//                       src={img}
//                       alt={`View ${index + 1}`}
//                       onError={(e) => {
//                         e.target.src = `https://via.placeholder.com/300x200?text=View+${
//                           index + 1
//                         }`;
//                         e.target.onerror = null;
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Contact Us Box */}
//       <div className="contact-us-box">
//         <div className="contact-us-content">
//           <h3>Need Help Choosing?</h3>
//           <p>Our experts are ready to help you find the perfect bike</p>
//           <NavLink to="/contact" className="contact-us-btn">
//             Contact Us
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BikeDetails;

import React, { useEffect, useState, useRef } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import "../../styles/BikeDetails/BikeDetails.css";

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [bikeDetails, setBikeDetails] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get API URL from environment variable
  const BASE_API = import.meta.HONDA_WEBSITE_URL || "https://wft8qmjb-4000.inc1.devtunnels.ms/bikes";

  // Prevent double fetch in React 18 StrictMode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (!BASE_API) {
      console.error("❌ BASE_API missing in .env");
      setLoading(false);
      return;
    }

    const fetchBikeData = async () => {
      try {
        setLoading(true);
        console.log("Fetching all bikes from:", BASE_API);
        
        const response = await fetch(BASE_API);
        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        console.log("✅ API Response:", data);

        if (data.data && Array.isArray(data.data)) {
          // Find the specific bike by ID
          const foundBike = data.data.find(b => b._id === id);
          
          if (foundBike) {
            console.log("✅ Found bike:", foundBike);
            
            const variant = foundBike.variants && foundBike.variants.length > 0 
              ? foundBike.variants[0] 
              : {};
            
            // Construct image URL (same as reference code)
            let imageUrl = "";
            if (foundBike.images && foundBike.images.length > 0) {
              const image = foundBike.images[0];
              const rawPath = image.s3Key;
              if (rawPath) {
                imageUrl = `${BASE_API.replace(/\/bikes$/, "")}/uploads/${encodeURI(rawPath)}`;
              }
            }

            // Set bike data (basic info)
            const bikeData = {
              id: foundBike._id,
              name: foundBike.model_name,
              model: foundBike.model_name,
              price: variant.on_road_price 
                ? `₹ ${variant.on_road_price.toLocaleString("en-IN")}`
                : "Price Coming Soon",
              image: imageUrl || "https://via.placeholder.com/400x300?text=No+Image"
            };
            
            console.log("✅ Bike data set:", bikeData);
            setBike(bikeData);
            
            // Set bike details data (all specifications)
            const bikeDetailsData = {
              id: foundBike._id,
              engine: variant.engine_cc ? `${variant.engine_cc}cc` : "Not specified",
              fuelCapacity: variant.fuel_tank_l ? `${variant.fuel_tank_l}L` : "Not specified",
              brakes: variant.brakes_front && variant.brakes_rear 
                ? `${variant.brakes_front} / ${variant.brakes_rear}`
                : "Not specified",
              tyre: variant.tyres_front && variant.tyres_rear 
                ? `${variant.tyres_front} / ${variant.tyres_rear}` 
                : "Not specified",
              maxPower: variant.max_power ? `${variant.max_power} bhp` : "Not specified",
              gearBox: variant.gearbox || "Not specified",
              clutch: variant.clutch || "Not specified",
              kerbWeight: variant.kerb_weight_kg ? `${variant.kerb_weight_kg} kg` : "Not specified",
              steering: "Handlebar",
              
              // Engine Specs
              engineSpecs: {
                "Engine Type": variant.engine_type || "Not specified",
                "Displacement": variant.engine_cc ? `${variant.engine_cc} cc` : "Not specified",
                "Max Power": variant.max_power ? `${variant.max_power} bhp` : "Not specified",
                "Max Torque": variant.max_torque ? `${variant.max_torque} Nm` : "Not specified",
                "Cooling System": "Air Cooled",
                "Starting Method": variant.starting || "Not specified"
              },
              
              // Transmission
              transmission: {
                "Transmission": variant.transmission || "Not specified",
                "Gearbox": variant.gearbox || "Not specified",
                "Clutch": variant.clutch || "Not specified"
              },
              
              // Dimensions
              dimensions: {
                "Length": variant.length_mm ? `${variant.length_mm} mm` : "Not specified",
                "Width": variant.width_mm ? `${variant.width_mm} mm` : "Not specified",
                "Height": variant.height_mm ? `${variant.height_mm} mm` : "Not specified",
                "Wheelbase": variant.wheelbase_mm ? `${variant.wheelbase_mm} mm` : "Not specified",
                "Ground Clearance": variant.ground_clearance_mm ? `${variant.ground_clearance_mm} mm` : "Not specified",
                "Seat Height": variant.seat_height_mm ? `${variant.seat_height_mm} mm` : "Not specified"
              },
              
              // Chassis
              chassis: {
                "Suspension Front": variant.suspension_front || "Not specified",
                "Suspension Rear": variant.suspension_rear || "Not specified",
                "Frame Type": "Tubular",
              },
              
              // Brakes
              brakesSpecs: {
                "Front Brake": variant.brakes_front || "Not specified",
                "Rear Brake": variant.brakes_rear || "Not specified"
              },
              
              // Tyres
              tyres: {
                "Front Tyre": variant.tyres_front || "Not specified",
                "Rear Tyre": variant.tyres_rear || "Not specified",
                "Tubeless": variant.tubeless ? "Yes" : "No"
              },
              
              // Price Breakdown
              priceBreakdown: {
                exShowroomPrice: variant.ex_showroom_price 
                  ? `₹ ${variant.ex_showroom_price.toLocaleString("en-IN")}`
                  : "Not specified",
                onRoadPrice: variant.on_road_price 
                  ? `₹ ${variant.on_road_price.toLocaleString("en-IN")}`
                  : "Not specified",
                rto: variant.on_road_price && variant.ex_showroom_price 
                  ? `₹ ${(variant.on_road_price - variant.ex_showroom_price - 5000).toLocaleString("en-IN")}` 
                  : "Not specified",
                insurance: "₹5,000"
              },
              
              // Colors
              colors: [
                { name: "Matte Black", code: "#1a1a1a" },
                { name: "Pearl White", code: "#ffffff" },
                { name: "Racing Red", code: "#ff0000" },
                { name: "Metallic Blue", code: "#0066cc" }
              ],
              
              // Gallery Images
              galleryImages: imageUrl 
                ? [imageUrl, imageUrl, imageUrl] 
                : [
                    `https://via.placeholder.com/600x400?text=${encodeURIComponent(foundBike.model_name)}+1`,
                    `https://via.placeholder.com/600x400?text=${encodeURIComponent(foundBike.model_name)}+2`,
                    `https://via.placeholder.com/600x400?text=${encodeURIComponent(foundBike.model_name)}+3`
                  ]
            };
            
            console.log("✅ Bike details set:", bikeDetailsData);
            setBikeDetails(bikeDetailsData);
            
            // Set first color as selected
            setSelectedColor({
              name: "Matte Black", 
              code: "#1a1a1a"
            });
          } else {
            console.log("❌ Bike not found with ID:", id);
          }
        }
      } catch (error) {
        console.error("🔥 API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikeData();
  }, [id, BASE_API]);

  const getDiscountedPrice = (priceString) => {
    if (!priceString || priceString === "Price Coming Soon") return "";
    const cleanPrice = priceString.replace("₹", "").replace(/,/g, "").trim();
    const priceNumber = parseFloat(cleanPrice);
    if (isNaN(priceNumber)) return "";
    const discounted = priceNumber * 0.85;
    return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="bike-details-page">
        <div className="loading-container">
          <h2>Loading bike details...</h2>
          <button
            className="back-to-bikes-btn"
            onClick={() => navigate("/bikes")}
          >
            Back to Bikes
          </button>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="bike-details-page">
        <div className="loading-container">
          <h2>Bike not found!</h2>
          <button
            className="back-to-bikes-btn"
            onClick={() => navigate("/bikes")}
          >
            Back to Bikes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bike-details-page">
      <div className="back-button-section">
        <button
          className="back-to-bikes-btn"
          onClick={() => navigate("/bikes")}
        >
          Back to Bikes
        </button>
      </div>

      <div className="bike-header">
        <div className="bike-main-info">
          <h1 className="bike-detail-name">{bike.name}</h1>
          <p className="bike-detail-model">{bike.model}</p>
          <div className="bike-price-tag">
            <span className="original-price-tag">{bike.price}</span>
            <span className="discounted-price-tag">
              {getDiscountedPrice(bike.price)}
            </span>
          </div>
        </div>
        <div className="get-bike-top">
          <button className="get-bike-btn">Get This Bike</button>
        </div>
      </div>

      <div className="mobile-section-dropdown">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="section-select"
        >
          <option value="overview">Overview</option>
          <option value="specifications">Specifications</option>
          <option value="colors">Colors</option>
          <option value="price">Price</option>
          <option value="gallery">Gallery</option>
        </select>
      </div>

      <div className="section-buttons">
        <button
          className={`section-btn ${
            activeSection === "overview" ? "active" : ""
          }`}
          onClick={() => setActiveSection("overview")}
        >
          Overview
        </button>
        <button
          className={`section-btn ${
            activeSection === "specifications" ? "active" : ""
          }`}
          onClick={() => setActiveSection("specifications")}
        >
          Specifications
        </button>
        <button
          className={`section-btn ${
            activeSection === "colors" ? "active" : ""
          }`}
          onClick={() => setActiveSection("colors")}
        >
          Colors
        </button>
        <button
          className={`section-btn ${activeSection === "price" ? "active" : ""}`}
          onClick={() => setActiveSection("price")}
        >
          Price
        </button>
        <button
          className={`section-btn ${
            activeSection === "gallery" ? "active" : ""
          }`}
          onClick={() => setActiveSection("gallery")}
        >
          Gallery
        </button>
      </div>

      <div className="section-content">
        {activeSection === "overview" && (
          <div className="overview-section">
            <div className="section-header no-border">
              <h2>Overview</h2>
              <p>Complete details about {bike.name}</p>
            </div>

            <div className="overview-content">
              <div className="overview-image-card">
                <div className="main-bike-image">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Bike+Image";
                      e.target.onerror = null;
                    }}
                  />
                </div>
              </div>

              <div className="overview-details">
                <h3>Key Features</h3>
                {bikeDetails && (
                  <div className="features-grid">
                    {[
                      { label: "Engine", value: bikeDetails.engine },
                      {
                        label: "Fuel Capacity",
                        value: bikeDetails.fuelCapacity,
                      },
                      { label: "Brakes", value: bikeDetails.brakes },
                      { label: "Tyre Type", value: bikeDetails.tyre },
                      { label: "Max Power", value: bikeDetails.maxPower },
                      { label: "Gear Box", value: bikeDetails.gearBox },
                      { label: "Clutch", value: bikeDetails.clutch },
                      { label: "Kerb Weight", value: bikeDetails.kerbWeight },
                      { label: "Steering", value: bikeDetails.steering },
                    ].map((feature, index) => (
                      <div className="feature-item" key={index}>
                        <div className="feature-info">
                          <span className="feature-label">{feature.label}</span>
                          <span className="feature-value">{feature.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="overview-description">
                  <h4>About This Bike</h4>
                  <p>
                    The {bike.name} is a premium offering from Honda, known for
                    its excellent performance, fuel efficiency, and stylish
                    design. Perfect for daily commuting and long rides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "specifications" && (
          <div className="specifications-section">
            <div className="section-header">
              <h2>Technical Specifications</h2>
              <p>Detailed technical information about {bike.name}</p>
            </div>

            <div className="specs-content">
              {bikeDetails && (
                <>
                  {[
                    { title: "Engine", specs: bikeDetails.engineSpecs },
                    { title: "Transmission", specs: bikeDetails.transmission },
                    { title: "Dimensions", specs: bikeDetails.dimensions },
                    {
                      title: "Chassis & Suspension",
                      specs: bikeDetails.chassis,
                    },
                    { title: "Brakes", specs: bikeDetails.brakesSpecs },
                    { title: "Tyres", specs: bikeDetails.tyres },
                    {
                      title: "Other Specifications",
                      specs: {
                        "Kerb Weight": bikeDetails.kerbWeight,
                        Steering: bikeDetails.steering,
                        "Fuel Capacity": bikeDetails.fuelCapacity,
                      },
                    },
                  ].map((group, groupIndex) => (
                    <div className="spec-group" key={groupIndex}>
                      <h3 className="spec-group-title">{group.title}</h3>
                      <div className="spec-grid">
                        {Object.entries(group.specs).map(
                          ([key, value], index) => (
                            <div className="spec-item" key={index}>
                              <span className="spec-label">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                              <span className="spec-value">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {activeSection === "colors" && (
          <div className="colors-section">
            <div className="section-header">
              <h2>Available Colors</h2>
              <p>Choose from our range of premium colors</p>
            </div>

            <div className="colors-content">
              <div className="color-preview-area">
                <div className="selected-color-display">
                  <div className="color-preview-card">
                    <div className="color-preview-image">
                      <div
                        className="color-preview-large"
                        style={{
                          backgroundColor: selectedColor?.code || "#f0f0f0",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="color-info">
                    <h3>{selectedColor?.name || "Select Color"}</h3>
                    <p>
                      The {selectedColor?.name || "selected color"} gives a
                      premium look to your {bike.name}. This color is durable
                      and maintains its shine for years.
                    </p>
                  </div>
                </div>
              </div>

              <div className="color-options-area">
                <h3>All Available Colors</h3>
                <div className="color-options-grid">
                  {bikeDetails?.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`color-option-card ${
                        selectedColor?.name === color.name ? "selected" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <div className="color-option-image">
                        <div
                          className="color-circle"
                          style={{
                            backgroundColor: color.code,
                            border:
                              color.code === "#ffffff"
                                ? "1px solid #ddd"
                                : "none",
                          }}
                          title={color.name}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "price" && (
          <div className="price-section">
            <div className="section-header">
              <h2>Price Details</h2>
              <p>Complete pricing information for {bike.name}</p>
            </div>

            <div className="price-content">
              {bikeDetails?.priceBreakdown ? (
                <div className="price-breakdown-card">
                  <div className="price-summary">
                    <div className="price-main">
                      <span className="price-label-main">On-Road Price</span>
                      <span className="price-value-main">
                        {bikeDetails.priceBreakdown.onRoadPrice}
                      </span>
                    </div>
                    <p className="price-note">
                      Inclusive of all taxes and charges
                    </p>
                  </div>

                  <div className="price-details">
                    <h3>Price Breakdown</h3>
                    <div className="price-breakdown-list">
                      {[
                        {
                          label: "Ex-Showroom Price",
                          value: bikeDetails.priceBreakdown.exShowroomPrice,
                        },
                        {
                          label: "Discounted Price",
                          value: getDiscountedPrice(
                            bikeDetails.priceBreakdown.exShowroomPrice
                          ),
                          discounted: true,
                        },
                        {
                          label: "RTO Charges",
                          value: bikeDetails.priceBreakdown.rto,
                        },
                        {
                          label: "Insurance",
                          value: bikeDetails.priceBreakdown.insurance,
                        },
                        {
                          label: "Total On-Road Price",
                          value: bikeDetails.priceBreakdown.onRoadPrice,
                          total: true,
                        },
                      ].map((item, index) => (
                        <div
                          className={`price-item ${item.total ? "total" : ""}`}
                          key={index}
                        >
                          <span className="price-item-label">{item.label}</span>
                          <span
                            className={`price-item-value ${
                              item.discounted ? "discounted" : ""
                            } ${item.total ? "total-price" : ""}`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="price-cta">
                    <button className="get-bike-btn large">
                      Get This Bike Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-price-info">
                  <p>Price information is not available for this bike.</p>
                  <button className="contact-btn">Contact for Price</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "gallery" && (
          <div className="gallery-section">
            <div className="section-header">
              <h2>Gallery</h2>
              <p>Images of {bike.name} from different angles</p>
            </div>

            <div className="gallery-content">
              <div className="main-gallery-image">
                <img
                  src={
                    bikeDetails?.galleryImages?.[selectedGalleryImage] ||
                    bike.image
                  }
                  alt={`${bike.name} - View ${selectedGalleryImage + 1}`}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Bike+Image";
                    e.target.onerror = null;
                  }}
                />
              </div>

              <div className="gallery-thumbnails">
                {bikeDetails?.galleryImages?.map((img, index) => (
                  <div
                    className={`thumbnail ${
                      selectedGalleryImage === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedGalleryImage(index)}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200?text=View+${
                          index + 1
                        }`;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Us Box */}
      <div className="contact-us-box">
        <div className="contact-us-content">
          <h3>Need Help Choosing?</h3>
          <p>Our experts are ready to help you find the perfect bike</p>
          <NavLink to="/contact" className="contact-us-btn">
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;