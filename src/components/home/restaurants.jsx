import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../utils/request";
import { RestaurantCard } from "../index";

const HomeRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    httpRequest("/api/restaurants", "GET").then((response) => {
      if (response.success) {
        setRestaurants(response.data);
      }
    });
  }, []);
  return (
    <div className="px-3 py-5 bg-grey">
      <div className="d-flex justify-content-between px-4">
      <p className="mx-3 my-auto text-yellow fw-semibold fs-3">
          Top Restaurants
        </p>
        <Link to="/restaurants" className="mx-3 my-auto text-dark text-decoration-none">See More</Link>
      </div>
      <div className="mx-3 bg-yellow" style={{ height: "2px" }}></div>
      <div className="px-4 py-3">
        <div className="row flex-row flex-nowrap" style={{overflowX: "auto", overflowY: "hidden"}}>
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
    </div>
  );
};

export default HomeRestaurants;
