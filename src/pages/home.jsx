import React, { useEffect } from "react";
import { HeroSection, HomeService, HomeRestaurants, HomeChefs } from "../components";

const Home = () => {
  return (
    <div className="bg-grey">
      <HeroSection />
      <div className="pt-4">
      <HomeChefs/>
      </div>
      <div className="pb-4">
      <HomeRestaurants/>
      </div>
      
      <HomeService/>
    </div>
  );
};

export default Home;
