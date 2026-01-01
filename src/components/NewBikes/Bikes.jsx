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
import { fetchBikes, fetchBikeImages, fetchVariantImages } from "../../services/api";

const Bikes = () => {
  const [bikesData, setBikesData] = useState([]);
  const [bikeImages, setBikeImages] = useState([]);
  const [variantImages, setVariantImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [bikesResponse, imagesResponse, variantImagesResponse] = await Promise.all([
          fetchBikes(),
          fetchBikeImages(),
          fetchVariantImages()
        ]);
        
        console.log("Bikes API Response:", bikesResponse);
        console.log("Images API Response:", imagesResponse);
        console.log("Variant Images API Response:", variantImagesResponse);
        
        // Ensure bikesResponse is an array
        const bikesArray = Array.isArray(bikesResponse) ? bikesResponse : [];
        
        // Combine bike data with images
        const bikesWithImages = bikesArray.map(bike => {
          // Find bike image
          const bikeImage = Array.isArray(imagesResponse) ? 
            imagesResponse.find(img => img.bikeId === bike.id) : null;
          
          // Find variant image (fallback)
          const variantImage = Array.isArray(variantImagesResponse) ?
            variantImagesResponse.find(img => img.bikeId === bike.id) : null;
          
          // Get price from bike data or variant
          let price = '₹ 1,00,000';
          if (bike.price) {
            price = `₹ ${parseInt(bike.price).toLocaleString('en-IN')}`;
          } else if (bike.variants && bike.variants[0] && bike.variants[0].price) {
            price = `₹ ${parseInt(bike.variants[0].price).toLocaleString('en-IN')}`;
          }
          
          // Get image URL
          let imageUrl = bikeImage?.imageUrl || 
                        variantImage?.imageUrl || 
                        bike.image || 
                        bike.bikeImage ||
                        'https://via.placeholder.com/300x200?text=Honda+Bike';
          
          // Ensure proper image URL format
          if (!imageUrl.startsWith('http')) {
            imageUrl = 'https://via.placeholder.com/300x200?text=Honda+Bike';
          }
          
          return {
            id: bike.id || bike._id,
            name: bike.name || bike.modelName || bike.bikeName || 'Honda Bike',
            model: bike.model || bike.variantName || bike.modelName || 'Standard Model',
            price: price,
            image: imageUrl,
            // Include all bike data for debugging
            rawData: bike
          };
        });
        
        setBikesData(bikesWithImages);
        setBikeImages(Array.isArray(imagesResponse) ? imagesResponse : []);
        setVariantImages(Array.isArray(variantImagesResponse) ? variantImagesResponse : []);
        
      } catch (err) {
        console.error("Full error loading bikes:", err);
        setError(err.message || "Failed to load bikes");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Mobile check for initial count
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setVisibleCount(6);
    }
  }, []);

  const getDiscountedPrice = (priceString) => {
    try {
      const cleanPrice = priceString.replace("₹", "").replace(/,/g, "").trim();
      const priceNumber = parseFloat(cleanPrice);
      if (isNaN(priceNumber)) return priceString;
      const discounted = priceNumber * 0.85;
      return `₹ ${Math.round(discounted).toLocaleString("en-IN")}`;
    } catch (err) {
      return priceString;
    }
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
          <p>Loading our latest collection of Honda...</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bikes-page-simple">
        <div className="bikes-heading">
          <h1>New Bikes</h1>
          <p>Unable to load bikes</p>
        </div>
        <div className="error-container">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#e4002b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bikes-page-simple">
      <div className="bikes-heading">
        <h1>New Bikes</h1>
        <p>Explore our latest collection of Honda</p>
        <p className="bike-count">Showing {bikesData.length} bikes</p>
      </div>

      <div className="bikes-container">
        {bikesData.length === 0 ? (
          <div className="no-bikes">
            <p>No bikes available at the moment.</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                background: '#e4002b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
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
                          e.target.src = 'https://via.placeholder.com/300x200?text=Honda+Bike';
                          e.target.onerror = null;
                        }}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'contain'
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
            
            {visibleCount < bikesData.length && (
              <div className="view-more">
                <button className="view-more-btn" onClick={handleViewMore}>
                  View More Bikes ({bikesData.length - visibleCount} more)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Bikes;