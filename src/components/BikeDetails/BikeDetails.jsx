import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { getAllBikes, API_BASE_URL } from "../../services/api";
import PurchaseFormModal from "../PurchaseModel/PurchaseFormModal";
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

  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  useEffect(() => {
    const fetchBike = async () => {
      setLoading(true);
      try {
        const bikes = await getAllBikes();
        const found = bikes.find((b) => b._id === id);

        if (!found) {
          setBike(null);
          setLoading(false);
          return;
        }

        const variant = found.variants?.[0] || {};
        const images =
          found.images?.map((img) => `${API_BASE_URL}/uploads/${img.s3Key}`) ||
          [];

        setBike({
          id: found._id,
          name: found.model_name || "-",
          model: found.segment || "-",
          price: variant.ex_showroom_price
            ? `₹ ${variant.ex_showroom_price.toLocaleString("en-IN")}`
            : "-",
          image: images[0] || "-",
        });

        setBikeDetails({
          engine: variant.engine_type || "-",
          fuelCapacity: variant.fuel_tank_l || "-",
          brakes: `${variant.brakes_front || "-"} / ${
            variant.brakes_rear || "-"
          }`,
          tyre: variant.tubeless ? "Tubeless" : "-",
          maxPower: variant.max_power || "-",
          gearBox: variant.gearbox || "-",
          clutch: variant.clutch || "-",
          kerbWeight: variant.kerb_weight_kg || "-",
          steering: "Handle Bar",

          engineSpecs: {
            "Engine CC": variant.engine_cc || "-",
            "Engine Type": variant.engine_type || "-",
            "Max Power": variant.max_power || "-",
            "Max Torque": variant.max_torque || "-",
          },

          transmission: {
            Transmission: variant.transmission || "-",
            Gearbox: variant.gearbox || "-",
            Clutch: variant.clutch || "-",
          },

          dimensions: {
            Length: variant.length_mm || "-",
            Width: variant.width_mm || "-",
            Height: variant.height_mm || "-",
            Wheelbase: variant.wheelbase_mm || "-",
            "Ground Clearance": variant.ground_clearance_mm || "-",
            "Seat Height": variant.seat_height_mm || "-",
          },

          chassis: {
            "Front Suspension": variant.suspension_front || "-",
            "Rear Suspension": variant.suspension_rear || "-",
          },

          brakesSpecs: {
            "Front Brake": variant.brakes_front || "-",
            "Rear Brake": variant.brakes_rear || "-",
          },

          tyres: {
            "Front Tyre": variant.tyres_front || "-",
            "Rear Tyre": variant.tyres_rear || "-",
          },

          priceBreakdown: {
            exShowroomPrice: variant.ex_showroom_price
              ? `₹ ${variant.ex_showroom_price.toLocaleString("en-IN")}`
              : "-",
            rto: "₹ 12,000",
            insurance: "₹ 8,000",
            onRoadPrice: variant.on_road_price
              ? `₹ ${variant.on_road_price.toLocaleString("en-IN")}`
              : "-",
          },

          colors: [
            { name: "Red", code: "#c00" },
            { name: "Black", code: "#000" },
            { name: "White", code: "#fff" },
          ],

          galleryImages: images,
        });

        setSelectedColor({ name: "Red", code: "#c00" });
      } catch (err) {
        console.error(err);
        setBike(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  const getDiscountedPrice = (priceString) => {
    if (!priceString || priceString === "-") return "-";
    const clean = priceString.replace("₹", "").replace(/,/g, "");
    return `₹ ${Math.round(clean * 0.85).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="bike-details-page">
        <div className="loading-container">
          <h2>Loading bike details...</h2>
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
          <button
            className="get-bike-btn"
            onClick={() => setShowPurchaseForm(true)}
          >
            Get This Bike
          </button>
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
                          ),
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
                            bikeDetails.priceBreakdown.exShowroomPrice,
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
                    <button
                      className="get-bike-btn large"
                      onClick={() => setShowPurchaseForm(true)}
                    >
                      Get This Bike Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-price-info">
                  <p>Price information is not available for this bike.</p>
                  <button
                    className="contact-btn"
                    onClick={() => setShowPurchaseForm(true)}
                  >
                    Contact for Price
                  </button>
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

      <div className="contact-us-box">
        <div className="contact-us-content">
          <h3>Need Help Choosing?</h3>
          <p>Our experts are ready to help you find the perfect bike</p>
          <NavLink to="/contact" className="contact-us-btn">
            Contact Us
          </NavLink>
        </div>
      </div>

      <PurchaseFormModal
        bikeName={bike.name}
        show={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </div>
  );
};

export default BikeDetails;

// Static Data Code

// import React, { useEffect, useState } from "react";
// import { useParams, NavLink, useNavigate } from "react-router-dom";
// import PurchaseFormModal from "../PurchaseModel/PurchaseFormModal";
// import "../../styles/BikeDetails/BikeDetails.css";

// const staticBikesData = [
//   {
//     id: "1",
//     name: "Honda Activa 6G",
//     model: "Scooter",
//     price: "₹ 74,183",
//     image: "https://via.placeholder.com/400x300?text=Activa+6G",
//     details: {
//       engine: "109.51 cc, Single Cylinder",
//       fuelCapacity: "5.3 L",
//       brakes: "Drum / Drum",
//       tyre: "Tubeless",
//       maxPower: "7.68 PS @ 8000 rpm",
//       gearBox: "CVT",
//       clutch: "Automatic",
//       kerbWeight: "107 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "109.51 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "7.68 PS @ 8000 rpm",
//         "Max Torque": "8.79 Nm @ 5500 rpm",
//       },
//       transmission: {
//         Transmission: "Automatic",
//         Gearbox: "CVT",
//         Clutch: "Automatic",
//       },
//       dimensions: {
//         Length: "1868 mm",
//         Width: "705 mm",
//         Height: "1140 mm",
//         Wheelbase: "1260 mm",
//         "Ground Clearance": "171 mm",
//         "Seat Height": "790 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "3-Step Adjustable Spring Loaded Hydraulic",
//       },
//       brakesSpecs: {
//         "Front Brake": "Drum",
//         "Rear Brake": "Drum",
//       },
//       tyres: {
//         "Front Tyre": "90/90-10",
//         "Rear Tyre": "90/100-10",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 74,183",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 94,183",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "White", code: "#fff" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=Activa+6G+View+1",
//         "https://via.placeholder.com/600x400?text=Activa+6G+View+2",
//         "https://via.placeholder.com/600x400?text=Activa+6G+View+3",
//       ],
//     },
//   },
//   {
//     id: "2",
//     name: "Honda SP 125",
//     model: "Commuter",
//     price: "₹ 82,301",
//     image: "https://via.placeholder.com/400x300?text=SP+125",
//     details: {
//       engine: "124.7 cc, Single Cylinder",
//       fuelCapacity: "11 L",
//       brakes: "Disc / Drum",
//       tyre: "Tubeless",
//       maxPower: "10.72 PS @ 7500 rpm",
//       gearBox: "5 Speed",
//       clutch: "Wet Multi Plate",
//       kerbWeight: "118 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "124.7 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "10.72 PS @ 7500 rpm",
//         "Max Torque": "10.9 Nm @ 6000 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "5 Speed",
//         Clutch: "Wet Multi Plate",
//       },
//       dimensions: {
//         Length: "2028 mm",
//         Width: "739 mm",
//         Height: "1070 mm",
//         Wheelbase: "1276 mm",
//         "Ground Clearance": "167 mm",
//         "Seat Height": "796 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "Spring Loaded Hydraulic",
//       },
//       brakesSpecs: {
//         "Front Brake": "Disc",
//         "Rear Brake": "Drum",
//       },
//       tyres: {
//         "Front Tyre": "80/100-18",
//         "Rear Tyre": "80/100-18",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 82,301",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 1,02,301",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "Blue", code: "#00f" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=SP+125+View+1",
//         "https://via.placeholder.com/600x400?text=SP+125+View+2",
//         "https://via.placeholder.com/600x400?text=SP+125+View+3",
//       ],
//     },
//   },
//   {
//     id: "3",
//     name: "Honda Shine",
//     model: "Commuter",
//     price: "₹ 77,500",
//     image: "https://via.placeholder.com/400x300?text=CB+Shine",
//     details: {
//       engine: "124.7 cc, Single Cylinder",
//       fuelCapacity: "10.5 L",
//       brakes: "Disc / Drum",
//       tyre: "Tubeless",
//       maxPower: "10.73 PS @ 7500 rpm",
//       gearBox: "5 Speed",
//       clutch: "Wet Multi Plate",
//       kerbWeight: "126 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "124.7 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "10.73 PS @ 7500 rpm",
//         "Max Torque": "10.9 Nm @ 6000 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "5 Speed",
//         Clutch: "Wet Multi Plate",
//       },
//       dimensions: {
//         Length: "2035 mm",
//         Width: "726 mm",
//         Height: "1082 mm",
//         Wheelbase: "1275 mm",
//         "Ground Clearance": "165 mm",
//         "Seat Height": "790 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "Spring Loaded Hydraulic",
//       },
//       brakesSpecs: {
//         "Front Brake": "Disc",
//         "Rear Brake": "Drum",
//       },
//       tyres: {
//         "Front Tyre": "80/100-18",
//         "Rear Tyre": "80/100-18",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 77,500",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 97,500",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "White", code: "#fff" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=Shine+View+1",
//         "https://via.placeholder.com/600x400?text=Shine+View+2",
//         "https://via.placeholder.com/600x400?text=Shine+View+3",
//       ],
//     },
//   },
//   {
//     id: "4",
//     name: "Honda Hornet 2.0",
//     model: "Street Fighter",
//     price: "₹ 1,31,946",
//     image: "https://via.placeholder.com/400x300?text=Hornet+2.0",
//     details: {
//       engine: "184.4 cc, Single Cylinder",
//       fuelCapacity: "12 L",
//       brakes: "Disc / Disc",
//       tyre: "Tubeless",
//       maxPower: "17.03 PS @ 8500 rpm",
//       gearBox: "5 Speed",
//       clutch: "Wet Multi Plate",
//       kerbWeight: "142 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "184.4 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "17.03 PS @ 8500 rpm",
//         "Max Torque": "16.1 Nm @ 6000 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "5 Speed",
//         Clutch: "Wet Multi Plate",
//       },
//       dimensions: {
//         Length: "2011 mm",
//         Width: "757 mm",
//         Height: "1048 mm",
//         Wheelbase: "1329 mm",
//         "Ground Clearance": "167 mm",
//         "Seat Height": "790 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "Monoshock",
//       },
//       brakesSpecs: {
//         "Front Brake": "Disc",
//         "Rear Brake": "Disc",
//       },
//       tyres: {
//         "Front Tyre": "110/70-17",
//         "Rear Tyre": "140/70-17",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 1,31,946",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 1,51,946",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "Blue", code: "#00f" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=Hornet+View+1",
//         "https://via.placeholder.com/600x400?text=Hornet+View+2",
//         "https://via.placeholder.com/600x400?text=Hornet+View+3",
//       ],
//     },
//   },
//   {
//     id: "5",
//     name: "Honda CB300R",
//     model: "Naked Sport",
//     price: "₹ 2,72,900",
//     image: "https://via.placeholder.com/400x300?text=CB300R",
//     details: {
//       engine: "293.5 cc, Single Cylinder",
//       fuelCapacity: "12 L",
//       brakes: "Disc / Disc",
//       tyre: "Tubeless",
//       maxPower: "30.4 PS @ 8000 rpm",
//       gearBox: "6 Speed",
//       clutch: "Wet Multi Plate",
//       kerbWeight: "143 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "293.5 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "30.4 PS @ 8000 rpm",
//         "Max Torque": "27.5 Nm @ 6500 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "6 Speed",
//         Clutch: "Wet Multi Plate",
//       },
//       dimensions: {
//         Length: "2025 mm",
//         Width: "786 mm",
//         Height: "1050 mm",
//         Wheelbase: "1338 mm",
//         "Ground Clearance": "149 mm",
//         "Seat Height": "800 mm",
//       },
//       chassis: {
//         "Front Suspension": "USD Fork",
//         "Rear Suspension": "Pro-Link Monoshock",
//       },
//       brakesSpecs: {
//         "Front Brake": "Disc",
//         "Rear Brake": "Disc",
//       },
//       tyres: {
//         "Front Tyre": "110/70-17",
//         "Rear Tyre": "150/60-17",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 2,72,900",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 2,92,900",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "White", code: "#fff" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=CB300R+View+1",
//         "https://via.placeholder.com/600x400?text=CB300R+View+2",
//         "https://via.placeholder.com/600x400?text=CB300R+View+3",
//       ],
//     },
//   },
//   {
//     id: "6",
//     name: "Honda CB200X",
//     model: "Adventure",
//     price: "₹ 1,44,500",
//     image: "https://via.placeholder.com/400x300?text=CB200X",
//     details: {
//       engine: "184.4 cc, Single Cylinder",
//       fuelCapacity: "12 L",
//       brakes: "Disc / Disc",
//       tyre: "Tubeless",
//       maxPower: "17.03 PS @ 8500 rpm",
//       gearBox: "5 Speed",
//       clutch: "Wet Multi Plate",
//       kerbWeight: "148 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "184.4 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "17.03 PS @ 8500 rpm",
//         "Max Torque": "16.1 Nm @ 6000 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "5 Speed",
//         Clutch: "Wet Multi Plate",
//       },
//       dimensions: {
//         Length: "2073 mm",
//         Width: "831 mm",
//         Height: "1133 mm",
//         Wheelbase: "1334 mm",
//         "Ground Clearance": "200 mm",
//         "Seat Height": "825 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "Monoshock",
//       },
//       brakesSpecs: {
//         "Front Brake": "Disc",
//         "Rear Brake": "Disc",
//       },
//       tyres: {
//         "Front Tyre": "100/80-17",
//         "Rear Tyre": "130/70-17",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 1,44,500",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 1,64,500",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "Green", code: "#006400" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=CB200X+View+1",
//         "https://via.placeholder.com/600x400?text=CB200X+View+2",
//         "https://via.placeholder.com/600x400?text=CB200X+View+3",
//       ],
//     },
//   },
//   {
//     id: "7",
//     name: "Honda Dio",
//     model: "Scooter",
//     price: "₹ 66,341",
//     image: "https://via.placeholder.com/400x300?text=Dio",
//     details: {
//       engine: "109.51 cc, Single Cylinder",
//       fuelCapacity: "5.3 L",
//       brakes: "Drum / Drum",
//       tyre: "Tubeless",
//       maxPower: "7.68 PS @ 8000 rpm",
//       gearBox: "CVT",
//       clutch: "Automatic",
//       kerbWeight: "104 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "109.51 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "7.68 PS @ 8000 rpm",
//         "Max Torque": "8.79 Nm @ 5500 rpm",
//       },
//       transmission: {
//         Transmission: "Automatic",
//         Gearbox: "CVT",
//         Clutch: "Automatic",
//       },
//       dimensions: {
//         Length: "1768 mm",
//         Width: "711 mm",
//         Height: "1082 mm",
//         Wheelbase: "1238 mm",
//         "Ground Clearance": "160 mm",
//         "Seat Height": "765 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "Spring Loaded Hydraulic",
//       },
//       brakesSpecs: {
//         "Front Brake": "Drum",
//         "Rear Brake": "Drum",
//       },
//       tyres: {
//         "Front Tyre": "90/90-10",
//         "Rear Tyre": "90/100-10",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 66,341",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 86,341",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "Blue", code: "#00f" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=Dio+View+1",
//         "https://via.placeholder.com/600x400?text=Dio+View+2",
//         "https://via.placeholder.com/600x400?text=Dio+View+3",
//       ],
//     },
//   },
//   {
//     id: "8",
//     name: "Honda Livo",
//     model: "Commuter",
//     price: "₹ 73,500",
//     image: "https://via.placeholder.com/400x300?text=Livo",
//     details: {
//       engine: "109.51 cc, Single Cylinder",
//       fuelCapacity: "10.5 L",
//       brakes: "Drum / Drum",
//       tyre: "Tubeless",
//       maxPower: "8.25 PS @ 7500 rpm",
//       gearBox: "4 Speed",
//       clutch: "Wet Multi Plate",
//       kerbWeight: "110 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "109.51 cc",
//         "Engine Type": "Single Cylinder, 4-Stroke",
//         "Max Power": "8.25 PS @ 7500 rpm",
//         "Max Torque": "9 Nm @ 5500 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "4 Speed",
//         Clutch: "Wet Multi Plate",
//       },
//       dimensions: {
//         Length: "1991 mm",
//         Width: "717 mm",
//         Height: "1072 mm",
//         Wheelbase: "1242 mm",
//         "Ground Clearance": "160 mm",
//         "Seat Height": "780 mm",
//       },
//       chassis: {
//         "Front Suspension": "Telescopic Fork",
//         "Rear Suspension": "Spring Loaded Hydraulic",
//       },
//       brakesSpecs: {
//         "Front Brake": "Drum",
//         "Rear Brake": "Drum",
//       },
//       tyres: {
//         "Front Tyre": "80/100-18",
//         "Rear Tyre": "80/100-18",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 73,500",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 93,500",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "White", code: "#fff" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=Livo+View+1",
//         "https://via.placeholder.com/600x400?text=Livo+View+2",
//         "https://via.placeholder.com/600x400?text=Livo+View+3",
//       ],
//     },
//   },
//   {
//     id: "9",
//     name: "Honda CBR650R",
//     model: "Sport",
//     price: "₹ 8,67,500",
//     image: "https://via.placeholder.com/400x300?text=CBR650R",
//     details: {
//       engine: "648.7 cc, Inline 4-Cylinder",
//       fuelCapacity: "15.4 L",
//       brakes: "Disc / Disc",
//       tyre: "Tubeless",
//       maxPower: "94.6 PS @ 12000 rpm",
//       gearBox: "6 Speed",
//       clutch: "Assist & Slipper",
//       kerbWeight: "202 kg",
//       steering: "Handle Bar",
//       engineSpecs: {
//         "Engine CC": "648.7 cc",
//         "Engine Type": "Inline 4-Cylinder, 4-Stroke",
//         "Max Power": "94.6 PS @ 12000 rpm",
//         "Max Torque": "64 Nm @ 8500 rpm",
//       },
//       transmission: {
//         Transmission: "Manual",
//         Gearbox: "6 Speed",
//         Clutch: "Assist & Slipper",
//       },
//       dimensions: {
//         Length: "2136 mm",
//         Width: "750 mm",
//         Height: "1147 mm",
//         Wheelbase: "1450 mm",
//         "Ground Clearance": "130 mm",
//         "Seat Height": "810 mm",
//       },
//       chassis: {
//         "Front Suspension": "USD Fork",
//         "Rear Suspension": "Pro-Link Monoshock",
//       },
//       brakesSpecs: {
//         "Front Brake": "Disc",
//         "Rear Brake": "Disc",
//       },
//       tyres: {
//         "Front Tyre": "120/70ZR17",
//         "Rear Tyre": "180/55ZR17",
//       },
//       priceBreakdown: {
//         exShowroomPrice: "₹ 8,67,500",
//         rto: "₹ 12,000",
//         insurance: "₹ 8,000",
//         onRoadPrice: "₹ 8,87,500",
//       },
//       colors: [
//         { name: "Red", code: "#c00" },
//         { name: "Black", code: "#000" },
//         { name: "Grey", code: "#808080" },
//       ],
//       galleryImages: [
//         "https://via.placeholder.com/600x400?text=CBR650R+View+1",
//         "https://via.placeholder.com/600x400?text=CBR650R+View+2",
//         "https://via.placeholder.com/600x400?text=CBR650R+View+3",
//       ],
//     },
//   },
// ];

// const BikeDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [bike, setBike] = useState(null);
//   const [bikeDetails, setBikeDetails] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [activeSection, setActiveSection] = useState("overview");
//   const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [showPurchaseForm, setShowPurchaseForm] = useState(false);

//   useEffect(() => {
//     const found = staticBikesData.find((b) => b.id === id);

//     if (!found) {
//       setBike(null);
//       setLoading(false);
//       return;
//     }

//     setBike({
//       id: found.id,
//       name: found.name,
//       model: found.model,
//       price: found.price,
//       image: found.image,
//     });

//     setBikeDetails(found.details);
//     setSelectedColor(found.details.colors[0]);
//     setLoading(false);
//   }, [id]);

//   const getDiscountedPrice = (priceString) => {
//     if (!priceString) return "";
//     const clean = priceString.replace("₹", "").replace(/,/g, "").trim();
//     return `₹ ${Math.round(clean * 0.85).toLocaleString("en-IN")}`;
//   };

//   if (loading) {
//     return (
//       <div className="bike-details-page">
//         <div className="loading-container">
//           <h2>Loading bike details...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (!bike) {
//     return (
//       <div className="bike-details-page">
//         <div className="loading-container">
//           <h2>Bike not found!</h2>
//           <button className="back-to-bikes-btn" onClick={() => navigate("/bikes")}>
//             Back to Bikes
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bike-details-page">
//       <div className="back-button-section">
//         <button className="back-to-bikes-btn" onClick={() => navigate("/bikes")}>
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
//           <button className="get-bike-btn" onClick={() => setShowPurchaseForm(true)}>
//             Get This Bike
//           </button>
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
//         {["overview", "specifications", "colors", "price", "gallery"].map((section) => (
//           <button
//             key={section}
//             className={`section-btn ${activeSection === section ? "active" : ""}`}
//             onClick={() => setActiveSection(section)}
//           >
//             {section.charAt(0).toUpperCase() + section.slice(1)}
//           </button>
//         ))}
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
//                       e.target.src = "https://via.placeholder.com/400x300?text=Bike+Image";
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
//                       { label: "Fuel Capacity", value: bikeDetails.fuelCapacity },
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
//                     { title: "Chassis & Suspension", specs: bikeDetails.chassis },
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
//                         {Object.entries(group.specs).map(([key, value], index) => (
//                           <div className="spec-item" key={index}>
//                             <span className="spec-label">{key.replace(/([A-Z])/g, " $1")}</span>
//                             <span className="spec-value">{value}</span>
//                           </div>
//                         ))}
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
//                         style={{ backgroundColor: selectedColor?.code || "#f0f0f0" }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="color-info">
//                     <h3>{selectedColor?.name || "Select Color"}</h3>
//                     <p>
//                       The {selectedColor?.name || "selected color"} gives a premium look to your{" "}
//                       {bike.name}. This color is durable and maintains its shine for years.
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
//                       className={`color-option-card ${selectedColor?.name === color.name ? "selected" : ""}`}
//                       onClick={() => setSelectedColor(color)}
//                     >
//                       <div className="color-option-image">
//                         <div
//                           className="color-circle"
//                           style={{
//                             backgroundColor: color.code,
//                             border: color.code === "#fff" ? "1px solid #ddd" : "none",
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
//                     <p className="price-note">Inclusive of all taxes and charges</p>
//                   </div>
//                   <div className="price-details">
//                     <h3>Price Breakdown</h3>
//                     <div className="price-breakdown-list">
//                       {[
//                         { label: "Ex-Showroom Price", value: bikeDetails.priceBreakdown.exShowroomPrice },
//                         { label: "Discounted Price", value: getDiscountedPrice(bikeDetails.priceBreakdown.exShowroomPrice), discounted: true },
//                         { label: "RTO Charges", value: bikeDetails.priceBreakdown.rto },
//                         { label: "Insurance", value: bikeDetails.priceBreakdown.insurance },
//                         { label: "Total On-Road Price", value: bikeDetails.priceBreakdown.onRoadPrice, total: true },
//                       ].map((item, index) => (
//                         <div className={`price-item ${item.total ? "total" : ""}`} key={index}>
//                           <span className="price-item-label">{item.label}</span>
//                           <span className={`price-item-value ${item.discounted ? "discounted" : ""} ${item.total ? "total-price" : ""}`}>
//                             {item.value}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="price-cta">
//                     <button className="get-bike-btn large" onClick={() => setShowPurchaseForm(true)}>
//                       Get This Bike Now
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="no-price-info">
//                   <p>Price information is not available for this bike.</p>
//                   <button className="contact-btn" onClick={() => setShowPurchaseForm(true)}>
//                     Contact for Price
//                   </button>
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
//                   src={bikeDetails?.galleryImages?.[selectedGalleryImage] || bike.image}
//                   alt={`${bike.name} - View ${selectedGalleryImage + 1}`}
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/600x400?text=Bike+Image";
//                     e.target.onerror = null;
//                   }}
//                 />
//               </div>
//               <div className="gallery-thumbnails">
//                 {bikeDetails?.galleryImages?.map((img, index) => (
//                   <div
//                     className={`thumbnail ${selectedGalleryImage === index ? "active" : ""}`}
//                     key={index}
//                     onClick={() => setSelectedGalleryImage(index)}
//                   >
//                     <img
//                       src={img}
//                       alt={`View ${index + 1}`}
//                       onError={(e) => {
//                         e.target.src = `https://via.placeholder.com/300x200?text=View+${index + 1}`;
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

//       <div className="contact-us-box">
//         <div className="contact-us-content">
//           <h3>Need Help Choosing?</h3>
//           <p>Our experts are ready to help you find the perfect bike</p>
//           <NavLink to="/contact" className="contact-us-btn">
//             Contact Us
//           </NavLink>
//         </div>
//       </div>

//       <PurchaseFormModal
//         bikeName={bike.name}
//         show={showPurchaseForm}
//         onClose={() => setShowPurchaseForm(false)}
//       />
//     </div>
//   );
// };

// export default BikeDetails;
