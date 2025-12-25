// import React, { useEffect, useState } from "react";
// import bikesData from "../../data/bikesData";
// import { NavLink } from "react-router-dom";

// const Bikes = () => {
//   const [visibleCount, setVisibleCount] = useState(9);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     if (isMobile) {
//       setVisibleCount(6);
//     }
//   }, []);

//   const getDiscountedPrice = (priceString) => {
//     const cleanPrice = priceString.replace("₹", "").replace(/,/g, "");
//     const priceNumber = parseFloat(cleanPrice);
//     const discounted = priceNumber * 0.85;
//     return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
//   };

//   const handleViewMore = () => {
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;

//     setVisibleCount((prev) => {
//       if (isMobile) {
//         return Math.min(prev + 6, bikesData.length);
//       }
//       return Math.min(prev + 9, bikesData.length);
//     });
//   };

//   const visibleBikes = bikesData.slice(0, visibleCount);

//   return (
//     <div className="bikes-page-simple">
//       <div className="bikes-heading">
//         <h1>New Bikes</h1>
//         <p>Explore our latest collection of Honda</p>
//       </div>

//       <div className="bikes-container">
//         <div className="bikes-grid">
//           {visibleBikes.map((bike) => (
//             <div
//               key={bike.id}
//               className={`bike-card ${
//                 hoveredCard === bike.id ? "hovered" : ""
//               }`}
//               onMouseEnter={() => setHoveredCard(bike.id)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className="bike-image">
//                 <NavLink to={`/bike/${bike.id}`}>
//                   <img src={bike.image} alt={bike.name} />
//                 </NavLink>
//               </div>

//               <div className="bike-info">
//                 <h3>{bike.name}</h3>
//                 <p className="bike-model">{bike.model}</p>

//                 <div className="bike-price">
//                   <span className="original-price">{bike.price}</span>
//                   <span className="discounted-price">
//                     {getDiscountedPrice(bike.price)}
//                   </span>
//                 </div>

//                 <NavLink to={`/bike/${bike.id}`} className="view-details-btn">
//                   View Details
//                 </NavLink>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {visibleCount < bikesData.length && (
//         <div className="view-more">
//           <button className="view-more-btn" onClick={handleViewMore}>
//             View More Bikes
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bikes;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Bikes = () => {
  const [bikesData, setBikesData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get API URL from environment variable
  const BASE_API = import.meta.HONDA_WEBSITE_URL || "https://wft8qmjb-4000.inc1.devtunnels.ms/bikes";

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setVisibleCount(6);
    }
  }, []);

  // Fetch bikes data from API
  useEffect(() => {
    const fetchBikesData = async () => {
      try {
        setLoading(true);
        console.log("Fetching bikes from:", BASE_API);
        
        const response = await fetch(BASE_API);
        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        console.log("✅ BIKES FETCHED:", data);

        if (data.data && Array.isArray(data.data)) {
          // Transform API data to match your structure
          const transformedData = data.data.map((bike) => {
            const variant = bike.variants && bike.variants.length > 0 
              ? bike.variants[0] 
              : {};
            
            // Construct image URL
            let imageUrl = "";
            if (bike.images && bike.images.length > 0) {
              const image = bike.images[0];
              const rawPath = image.s3Key;
              if (rawPath) {
                imageUrl = `${BASE_API.replace(/\/bikes$/, "")}/uploads/${encodeURI(rawPath)}`;
              }
            }

            return {
              id: bike._id,
              name: bike.model_name,
              model: bike.model_name,
              price: variant.on_road_price 
                ? `₹ ${variant.on_road_price.toLocaleString("en-IN")}`
                : "Price Coming Soon",
              image: imageUrl || "https://via.placeholder.com/300x200?text=No+Image"
            };
          });

          setBikesData(transformedData);
        }
      } catch (error) {
        console.error("🔥 API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikesData();
  }, [BASE_API]);

  const getDiscountedPrice = (priceString) => {
    if (!priceString || priceString === "Price Coming Soon") return "";
    const cleanPrice = priceString.replace("₹", "").replace(/,/g, "").trim();
    const priceNumber = parseFloat(cleanPrice);
    if (isNaN(priceNumber)) return "";
    const discounted = priceNumber * 0.85;
    return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
  };

  const handleViewMore = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    setVisibleCount((prev) => {
      if (isMobile) {
        return Math.min(prev + 6, bikesData.length);
      }
      return Math.min(prev + 9, bikesData.length);
    });
  };

  const visibleBikes = bikesData.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="bikes-page-simple">
        <div className="bikes-heading">
          <h1>New Bikes</h1>
          <p>Loading bikes...</p>
        </div>
        <div className="loading-placeholder">
          <p>Fetching bike data...</p>
        </div>
      </div>
    );
  }

  if (bikesData.length === 0) {
    return (
      <div className="bikes-page-simple">
        <div className="bikes-heading">
          <h1>New Bikes</h1>
          <p>No bikes available at the moment</p>
        </div>
        <div className="no-data-message">
          <p>Check back later for our bike collection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bikes-page-simple">
      <div className="bikes-heading">
        <h1>New Bikes</h1>
        <p>Explore our latest collection of Honda</p>
      </div>

      <div className="bikes-container">
        <div className="bikes-grid">
          {visibleBikes.map((bike) => (
            <div
              key={bike.id}
              className={`bike-card ${
                hoveredCard === bike.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredCard(bike.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bike-image">
                <NavLink to={`/bike/${bike.id}`}>
                  <img 
                    src={bike.image} 
                    alt={bike.name} 
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      e.target.onerror = null;
                    }}
                  />
                </NavLink>
              </div>

              <div className="bike-info">
                <h3>{bike.name}</h3>
                <p className="bike-model">{bike.model}</p>

                <div className="bike-price">
                  <span className="original-price">{bike.price}</span>
                  <span className="discounted-price">
                    {getDiscountedPrice(bike.price)}
                  </span>
                </div>

                <NavLink to={`/bike/${bike.id}`} className="view-details-btn">
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleCount < bikesData.length && (
        <div className="view-more">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More Bikes
          </button>
        </div>
      )}
    </div>
  );
};

export default Bikes;