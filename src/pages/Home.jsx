import { useState, useEffect } from 'react';
import Imageslider from '../components/Home/Imageslider';
import WelcomeSection from '../components/Home/Welcomesection';
import PickBike from '../components/Home/PickBike';
import CustomerReviews from '../components/Home/CustomerReviews';
import ReachUsAt from '../components/Home/ReachUsAt';

import "../styles/Home/customerreview.css";
import "../styles/Home/imageslider.css";
import "../styles/Home/pickbike.css";
import "../styles/Home/reachusat.css";
import "../styles/Home/welcomesection.css";

const Home = () => {
  const sliderImages = [
    'images/slider_img_1.jpg',
    'images/slider_img_2.jpg', 
    'images/slider_img_3.jpg',
    'images/slider_img_4.jpg',
    'images/slider_img_5.jpeg'
  ];

  return (
    <>
      <Imageslider 
        images={sliderImages} 
        autoSlide={true} 
        slideInterval={2000}
      />
      
      <WelcomeSection />
      
      <PickBike/>
      <CustomerReviews/>
      <ReachUsAt />
      </>
    
  );
};

export default Home;