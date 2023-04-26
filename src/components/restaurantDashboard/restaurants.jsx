import React, { useEffect, useState } from "react";
import httpRequest from "../../utils/request";
import RestaurantCard from "../cards/restaurantCard";

const RestaurantDashboardRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    httpRequest("/api/user/restaurants", "GET").then((response) => {
      if (response.success) {
        setRestaurants(response.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
        <div className="d-flex justify-content-between align-items-center mx-2">
          <h2 className="text-yellow">My Restaurants</h2>
        </div>
        <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
        <div className="my-4 row">
          {restaurants.map((restaurant, index) => (
            <div
              key={`restaurant_dashboard_restaurants_card_${index}`}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-3"
            >
              <RestaurantCard {...restaurant} role="restaurant" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardRestaurants;
