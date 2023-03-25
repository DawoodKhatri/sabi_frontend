import React from "react";
import image from "../../assets/images/food2.jpg";
import styles from "../../styles/home.module.css";
import HomeNav from "./homeNav";

const HeroSection = () => {
  return (
    <>
      <div className={`${styles.section} w-100 text-center`}>
        <div className={`${styles.background} w-100 position-absolute`}>
          <img src={image} className="w-100" alt="" />
        </div>
        <div className={`${styles.foreground} position-relative w-100 h-100`}>
          <HomeNav />
          <div className={`${styles.text} text-warning`}>
            <p className={`${styles.title} m-0 p-0`}>Welcome to SABI</p>
            <p className={`${styles.subtitle} m-0 p-0`}>Order Now, Eat Later</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
