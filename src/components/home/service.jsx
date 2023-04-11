import React from "react";
import restaurant from "../../assets/images/restaurant.png";
import dish from "../../assets/images/menu.png";
import chef from "../../assets/images/cooking.png";
import schedule from "../../assets/images/schedule.png";
import {ServiceCard} from "../index";

const HomeService = () => {
  return (
    <>
      <div className="container-fluid text-center bg-yellow py-4">
        <div className="row justify-content-center">
          <ServiceCard
            image={restaurant}
            title="Choose Restaurant"
            text="Choose your favourite restaurant near you to Dine."
          />
          <ServiceCard
            image={dish}
            title="Choose Dish"
            text="Choose your favourite Dish."
          />
          <ServiceCard
            image={chef}
            title="Choose Chef"
            text="Find the Chef of your choice whose food you enjoy."
          />
          <ServiceCard
            image={schedule}
            title="Choose Table and Schedule Arrival"
            text="Book a table of your choice and schedule your visit."
          />
        </div>
      </div>
    </>
  );
};

export default HomeService;
