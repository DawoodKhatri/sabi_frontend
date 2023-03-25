import React, { useEffect } from "react";
import { HeroSection, HomeService, HomeRestaurants } from "../components";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HomeRestaurants/>
      <HomeService/>
    </>
  );
};

export default Home;
