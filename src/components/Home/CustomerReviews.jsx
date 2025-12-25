import React, { useEffect, useState } from "react";

const reviewsData = [
  {
    id: 1,
    name: "Hiten Prajapati",
    role: "Honda Shine 100 Owner",
    comment:
      "Iromnt good running ussnan only over and Nov adipisicing elit. Omnis, pariatur praesentium non odio debitis iste natus ipsam architecto sunt magnam, recusandae explicabo ut deleniti, numquam.",
    image: "images/hiten.jpg",
  },
  {
    id: 2,
    name: "Hiten Prajapati",
    role: "Honda Activa Owner",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, pariatur praesentium non odio debitis iste natus ipsam architecto sunt magnam, recusandae explicabo ut deleniti, numquam at minima .",
    image: "images/hiten.jpg",
  },
  {
    id: 3,
    name: "Hiten Prajapati",
    role: "Honda Dio Owner",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, pariatur praesentium non odio debitis iste natus ipsam architecto sunt magnam, recusandae explicabo ut deleniti, numquam at minima .",
    image: "images/hiten.jpg",
  },
];

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === reviewsData.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="three-boxes-reviews">
      <div className="reviews-wrapper">
        <div className="reviews-title-box">
          <h2 className="reviews-main-title">What Our Clients Say</h2>
          <p className="reviews-sub-title">
            Real feedback from our happy customers
          </p>
        </div>

        <div className="review-slider">
          <div
            className="review-boxes-container"
            style={{
              transform: `translateX(-${activeIndex * 100}vw)`,
            }}
          >
            {reviewsData.map((review) => (
              <div key={review.id} className="review-box">
                <p className="review-box-text">{review.comment}</p>

                <div className="review-box-client">
                  <div className="client-avatar">
                    <img src={review.image} alt={review.name} />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">{review.name}</h4>
                    <p className="client-designation">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="review-dots">
          {reviewsData.map((_, index) => (
            <span
              key={index}
              className={`dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
