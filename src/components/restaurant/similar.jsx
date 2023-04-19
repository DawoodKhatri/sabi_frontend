import React, { useEffect, useState } from "react";
import RestaurantCard from "../cards/restaurantCard";
import httpRequest from "../../utils/request";

const RestaurantSimilar = ({ id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    httpRequest(`/getSimilarRestaurants/${id}`, "GET", {}, true).then(
      (response) => {
        if (response.success) {
          setRestaurants(response.data);
        }
      }
    );
  }, [id]);

  return (
    <div className="container-fluid shadow w-auto my-4 mx-2 p-2 p-md-4 rounded">
      <h3 className="mb-3 mx-2 text-yellow">Similar Restaurants</h3>
      <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
      <div className="px-1 py-3 px-md-4">
        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div
              key={`restaurant_page_similar_restaurants_card_${index}`}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-12 p-3"
            >
              <RestaurantCard {...restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantSimilar;
