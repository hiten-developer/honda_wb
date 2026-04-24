import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllBikes, getBikeImages, API_BASE_URL } from "../../services/api";

const Bikes = () => {
  const [bikesData, setBikesData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) setVisibleCount(6);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bikes = await getAllBikes();
        const images = await getBikeImages();

        const formatted = bikes.map((bike) => {
          const img = images.find((i) => i.bike_id === bike._id);

          return {
            id: bike._id,
            name: bike.model_name ,
            model: bike.segment,
            price: bike.variants?.[0]?.ex_showroom_price
              ? `₹ ${bike.variants[0].ex_showroom_price.toLocaleString("en-IN")}`
              : "",
            image: img
              ? `${API_BASE_URL}/uploads/${img.s3Key}`
              : "https://via.placeholder.com/300x200?text=Bike",
          };
        });

        setBikesData(formatted);
      } catch (err) {
        console.error(err);
        setBikesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDiscountedPrice = (priceString) => {
    if (!priceString || priceString == "-" ) return "-";
    const cleanPrice = priceString.replace("₹", "").replace(/,/g, "");
    return `₹ ${Math.round(cleanPrice * 0.85).toLocaleString("en-IN")}`;
  };

  const handleViewMore = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setVisibleCount((prev) =>
      Math.min(prev + (isMobile ? 6 : 9), bikesData.length),
    );
  };

  const visibleBikes = bikesData.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="bikes-page-simple">
        <div className="loading-container">
          <h2>Loading bikes...</h2>
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
                  <img src={bike.image} alt={bike.name} />
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

// Static Data Code

// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// const staticBikesData = [
//   {
//     id: "1",
//     name: "Honda Activa 6G",
//     model: "Scooter",
//     price: "₹ 74,183",
//     image: "http://localhost:5173/images/honda_1.avif",
//   },
//   {
//     id: "2",
//     name: "Honda SP 125",
//     model: "Commuter",
//     price: "₹ 82,301",
//     image: "http://localhost:5173/images/honda_1.avif",
//   },
//   {
//     id: "3",
//     name: "Honda Shine",
//     model: "Commuter",
//     price: "₹ 77,500",
//     image: "http://localhost:5173/images/honda_1.avif",
//   },
//   {
//     id: "4",
//     name: "Honda Hornet 2.0",
//     model: "Street Fighter",
//     price: "₹ 1,31,946",
//     image: "http://localhost:5173/images/honda_1.avif",
//   },
//   {
//     id: "5",
//     name: "Honda CB300R",
//     model: "Naked Sport",
//     price: "₹ 2,72,900",
//     image: "http://localhost:5173/images/honda_1.avif",
//   },
//   {
//     id: "6",
//     name: "Honda CB200X",
//     model: "Adventure",
//     price: "₹ 1,44,500",
//     image: "http://localhost:5173/images/honda_1.avif",
//   },
//   {
//     id: "7",
//     name: "Honda Dio",
//     model: "Scooter",
//     price: "₹ 66,341",
//     image: "https://cdn2.bikedekho.com/processedimages/honda/dio/494X300/dio6411f4c5d6e7f.jpg",
//   },
//   {
//     id: "8",
//     name: "Honda Livo",
//     model: "Commuter",
//     price: "₹ 73,500",
//     image: "https://cdn2.bikedekho.com/processedimages/honda/livo/494X300/livo6411f5d6e7f8a.jpg",
//   },
//   {
//     id: "9",
//     name: "Honda CBR650R",
//     model: "Sport",
//     price: "₹ 8,67,500",
//     image: "https://cdn2.bikedekho.com/processedimages/honda/cbr650r/494X300/cbr650r6411f6e7f8a9b.jpg",
//   },
// ];

// const Bikes = () => {
//   const [bikesData] = useState(staticBikesData);
//   const [visibleCount, setVisibleCount] = useState(9);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     if (isMobile) setVisibleCount(6);
//   }, []);

//   const getDiscountedPrice = (priceString) => {
//     if (!priceString) return "";
//     const cleanPrice = priceString.replace("₹", "").replace(/,/g, "").trim();
//     return `₹ ${Math.round(cleanPrice * 0.85).toLocaleString("en-IN")}`;
//   };

//   const handleViewMore = () => {
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     setVisibleCount((prev) =>
//       Math.min(prev + (isMobile ? 6 : 9), bikesData.length)
//     );
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
//               className={`bike-card ${hoveredCard === bike.id ? "hovered" : ""}`}
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
