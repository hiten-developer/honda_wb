import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllBikes, getBikeImages, API_BASE_URL } from "../../services/api";
import PurchaseFormModal from "../PurchaseModel/PurchaseFormModal";
import "../../styles/Home/pickbike.css";

const PickBike = () => {
  const [bikesData, setBikesData] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bikes = await getAllBikes();
        const images = await getBikeImages();

        const formatted = bikes.map((bike) => {
          const img = images.find((i) => i.bike_id === bike._id);
          const variant = bike.variants?.[0] || {};

          return {
            id: bike._id,
            name: bike.model_name || "hiten",
            model: bike.segment || "hiten",
            price: variant.ex_showroom_price
              ? `₹ ${variant.ex_showroom_price.toLocaleString("en-IN")}`
              : "hiten",
            image: img
              ? `${API_BASE_URL}/uploads/${img.s3Key}`
              : "https://via.placeholder.com/300x200?text=Bike",
            engine: variant.engine_type || "hiten",
            fuelCapacity: variant.fuel_tank_l || "hiten",
            brakes: `${variant.brakes_front || "hiten"} / ${
              variant.brakes_rear || "hiten"
            }`,
          };
        });

        setBikesData(formatted);
        setSelectedBike(formatted[0]);
      } catch (err) {
        console.error(err);
        setBikesData([]);
        setSelectedBike(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setDropdownOpen(false);
  };

  if (loading || !selectedBike) {
    return (
      <section className="pick-bike-simple">
        <h2 className="simple-title">Pick a Bike to Start</h2>
        <div className="loading-container">
          <h3>Loading bikes...</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="pick-bike-simple">
      <h2 className="simple-title">Pick a Bike to Start</h2>

      <div className="simple-container">
        <div className="bike-names-list">
          <h3 className="desktop-only">All Bikes</h3>

          <div
            className="mobile-dropdown-header"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{selectedBike.name}</span>
            <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
          </div>

          <div className={`names-scroll ${dropdownOpen ? "open" : ""}`}>
            {bikesData.map((bike) => (
              <div
                key={bike.id}
                className={`name-item ${
                  selectedBike.id === bike.id ? "active" : ""
                }`}
                onClick={() => handleSelectBike(bike)}
              >
                <h4>{bike.name}</h4>
                <p>{bike.model}</p>
                <span className="price">{bike.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bike-details-box">
          <h3>Selected Bike</h3>

          <div className="details-box">
            <div className="bike-image-box">
              <img src={selectedBike.image} alt={selectedBike.name} />
            </div>

            <div className="bike-info-box">
              <h2>{selectedBike.name}</h2>
              <p className="model">{selectedBike.model}</p>
              <p className="price-big">{selectedBike.price}</p>

              <div className="specs-box">
                <div className="spec">
                  <span>Engine</span>
                  <span>{selectedBike.engine}</span>
                </div>
                <div className="spec">
                  <span>Fuel Capacity</span>
                  <span>{selectedBike.fuelCapacity}</span>
                </div>
                <div className="spec">
                  <span>Brakes</span>
                  <span>{selectedBike.brakes}</span>
                </div>
              </div>

              <div className="buttons-box">
                <button
                  className="btn-price"
                  onClick={() => setShowPurchaseForm(true)}
                >
                  Get On Road Price
                </button>

                <NavLink to={`/bike/${selectedBike.id}`}>
                  <button className="btn-details">View More Details</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseFormModal
        bikeName={selectedBike.name}
        show={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </section>
  );
};

export default PickBike;

// Static Data Code

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import PurchaseFormModal from "../PurchaseModel/PurchaseFormModal";
// import "../../styles/Home/pickbike.css";

// const staticBikesData = [
//   {
//     id: "1",
//     name: "Honda Activa 6G",
//     model: "Scooter",
//     price: "₹ 74,183",
//     image: "http://localhost:5173/images/honda_1.avif",
//     engine: "109.51 cc, Single Cylinder",
//     fuelCapacity: "5.3 L",
//     brakes: "Drum / Drum",
//   },
//   {
//     id: "2",
//     name: "Honda SP 125",
//     model: "Commuter",
//     price: "₹ 82,301",
//     image: "https://via.placeholder.com/300x200?text=SP+125",
//     engine: "124.7 cc, Single Cylinder",
//     fuelCapacity: "11 L",
//     brakes: "Disc / Drum",
//   },
//   {
//     id: "3",
//     name: "Honda Shine",
//     model: "Commuter",
//     price: "₹ 77,500",
//     image: "https://via.placeholder.com/300x200?text=CB+Shine",
//     engine: "124.7 cc, Single Cylinder",
//     fuelCapacity: "10.5 L",
//     brakes: "Disc / Drum",
//   },
//   {
//     id: "4",
//     name: "Honda Hornet 2.0",
//     model: "Street Fighter",
//     price: "₹ 1,31,946",
//     image: "https://via.placeholder.com/300x200?text=Hornet+2.0",
//     engine: "184.4 cc, Single Cylinder",
//     fuelCapacity: "12 L",
//     brakes: "Disc / Disc",
//   },
//   {
//     id: "5",
//     name: "Honda CB300R",
//     model: "Naked Sport",
//     price: "₹ 2,72,900",
//     image: "https://via.placeholder.com/300x200?text=CB300R",
//     engine: "293.5 cc, Single Cylinder",
//     fuelCapacity: "12 L",
//     brakes: "Disc / Disc",
//   },
//   {
//     id: "6",
//     name: "Honda CB200X",
//     model: "Adventure",
//     price: "₹ 1,44,500",
//     image: "https://via.placeholder.com/300x200?text=CB200X",
//     engine: "184.4 cc, Single Cylinder",
//     fuelCapacity: "12 L",
//     brakes: "Disc / Disc",
//   },
//   {
//     id: "7",
//     name: "Honda Dio",
//     model: "Scooter",
//     price: "₹ 66,341",
//     image: "https://via.placeholder.com/300x200?text=Dio",
//     engine: "109.51 cc, Single Cylinder",
//     fuelCapacity: "5.3 L",
//     brakes: "Drum / Drum",
//   },
//   {
//     id: "8",
//     name: "Honda Livo",
//     model: "Commuter",
//     price: "₹ 73,500",
//     image: "https://via.placeholder.com/300x200?text=Livo",
//     engine: "109.51 cc, Single Cylinder",
//     fuelCapacity: "10.5 L",
//     brakes: "Drum / Drum",
//   },
//   {
//     id: "9",
//     name: "Honda CBR650R",
//     model: "Sport",
//     price: "₹ 8,67,500",
//     image: "https://via.placeholder.com/300x200?text=CBR650R",
//     engine: "648.7 cc, Inline 4-Cylinder",
//     fuelCapacity: "15.4 L",
//     brakes: "Disc / Disc",
//   },
// ];

// const PickBike = () => {
//   const [selectedBike, setSelectedBike] = useState(staticBikesData[0]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showPurchaseForm, setShowPurchaseForm] = useState(false);

//   const handleSelectBike = (bike) => {
//     setSelectedBike(bike);
//     setDropdownOpen(false);
//   };

//   return (
//     <section className="pick-bike-simple">
//       <h2 className="simple-title">Pick a Bike to Start</h2>

//       <div className="simple-container">
//         <div className="bike-names-list">
//           <h3 className="desktop-only">All Bikes</h3>

//           <div
//             className="mobile-dropdown-header"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <span>{selectedBike.name}</span>
//             <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
//           </div>

//           <div className={`names-scroll ${dropdownOpen ? "open" : ""}`}>
//             {staticBikesData.map((bike) => (
//               <div
//                 key={bike.id}
//                 className={`name-item ${selectedBike.id === bike.id ? "active" : ""}`}
//                 onClick={() => handleSelectBike(bike)}
//               >
//                 <h4>{bike.name}</h4>
//                 <p>{bike.model}</p>
//                 <span className="price">{bike.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bike-details-box">
//           <h3>Selected Bike</h3>

//           <div className="details-box">
//             <div className="bike-image-box">
//               <img src={selectedBike.image} alt={selectedBike.name} />
//             </div>

//             <div className="bike-info-box">
//               <h2>{selectedBike.name}</h2>
//               <p className="model">{selectedBike.model}</p>
//               <p className="price-big">{selectedBike.price}</p>

//               <div className="specs-box">
//                 <div className="spec">
//                   <span>Engine</span>
//                   <span>{selectedBike.engine}</span>
//                 </div>
//                 <div className="spec">
//                   <span>Fuel Capacity</span>
//                   <span>{selectedBike.fuelCapacity}</span>
//                 </div>
//                 <div className="spec">
//                   <span>Brakes</span>
//                   <span>{selectedBike.brakes}</span>
//                 </div>
//               </div>

//               <div className="buttons-box">
//                 <button
//                   className="btn-price"
//                   onClick={() => setShowPurchaseForm(true)}
//                 >
//                   Get On Road Price
//                 </button>

//                 <NavLink to={`/bike/${selectedBike.id}`}>
//                   <button className="btn-details">View More Details</button>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <PurchaseFormModal
//         bikeName={selectedBike.name}
//         show={showPurchaseForm}
//         onClose={() => setShowPurchaseForm(false)}
//       />
//     </section>
//   );
// };

// export default PickBike;