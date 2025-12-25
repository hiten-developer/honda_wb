

      
        
        
          
            
              
                
              
        

import React, { useState } from 'react';
import bikesData from '../../data/bikesData';

const PickBike = () => {
  const [selectedBike, setSelectedBike] = useState(bikesData[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setDropdownOpen(false);
  };

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
            <span className="arrow">{dropdownOpen ? '▲' : '▼'}</span>
          </div>

          <div className={`names-scroll ${dropdownOpen ? 'open' : ''}`}>
            {bikesData.map((bike) => (
              <div
                key={bike.id}
                className={`name-item ${selectedBike.id === bike.id ? 'active' : ''}`}
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
                <button className="btn-price">Get On Road Price</button>
                <button className="btn-details">View More Details</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PickBike;
