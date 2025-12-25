import React from 'react';

const WelcomeSection = () => {
  const timelineData = [
    { year: "1983", title: "Since 1983", desc: "Madhika Honda.", bg: "year-red" },
    { year: "1997", title: "Since 1997", desc: "Madhika Honda.", bg: "year-black" },
    { year: "2025", title: "Since 2025", desc: "Madhika Honda.", bg: "year-gray" }
  ];

  return (
    <div className="welcome-fixed-section">
      <div className="welcome-fixed-box">
        
        <div className="fixed-left">
          <h1 className="fixed-heading">
            Welcome to <span className="fixed-brand">Madhika Honda</span>
          </h1>
          
          <div className="fixed-timeline">
            {timelineData.map((item, index) => (
              <div key={index} className="fixed-item">
                <div className={`fixed-year ${item.bg}`}>
                  {item.year}
                </div>
                <div className="fixed-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                {index < timelineData.length - 1 && (
                  <div className="fixed-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="fixed-right">
          <div className="fixed-image-box">
            <img 
              src="images/honda_1.avif" 
              alt="Honda Motorcycle" 
              className="fixed-img"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomeSection;