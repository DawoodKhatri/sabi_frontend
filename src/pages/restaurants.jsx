import React, { useEffect, useState } from "react";
import { Navbar, RestaurantCard } from "../components";
import httpRequest from "../utils/request";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    httpRequest("/api/restaurants", "GET").then((response) => {
      if (response.success) {
        setRestaurants(response.data);
      }
    });
  }, []);
  return (
    <>
    <Navbar/>
    <div className="px-3 py-5">
      <div className="d-flex justify-content-between px-4">
        <p className="mx-3 my-auto text-warning fw-semibold fs-3">
          Top Restaurants
        </p>
      </div>
      <div className="mx-3 bg-warning" style={{ height: "2px" }}></div>
      <div className="px-4 py-3">
        <div
          className="row"
        >
          {restaurants.map((restaurant, index) => (
            <div
              key={`home_page_restaurants_card_${index}`}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-3"
            >
              <RestaurantCard {...restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div></>
  );
};

export default Restaurants;
