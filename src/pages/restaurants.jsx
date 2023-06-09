import React, { useEffect, useState } from "react";
import { Navbar, RestaurantCard } from "../components";
import httpRequest from "../utils/request";

const Restaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [allCuisines, setCuisines] = useState([]);
  useEffect(() => {
    httpRequest("/api/restaurants", "GET").then((response) => {
      if (response.success) {
        setAllRestaurants(response.data);
        setRestaurants(response.data);

        let allCuisines = [];
        response.data.forEach(({ cuisines }) => {
          for (let cuisine of cuisines) {
            if (!allCuisines.includes(cuisine)) {
              allCuisines.push(cuisine);
            }
          }
        });
        setCuisines(allCuisines);
      }
    });
  }, []);

  const filterRestaurants = ({ target: { value } }) => {
    if (value === "All") {
      setRestaurants(allRestaurants);
    } else {
      setRestaurants(
        allRestaurants.filter(({ cuisines }) => cuisines.includes(value))
      );
    }
  };
  return (
    <>
      <Navbar />
      <div className="px-3 py-5 bg-grey">
        <div className="d-flex justify-content-between px-4">
          <p className="mx-3 my-auto text-yellow fw-semibold fs-3">
            Top Restaurants
          </p>
          <select
            className="form-select w-auto mx-3 my-2"
            onChange={filterRestaurants}
          >
            <option selected>All</option>
            {allCuisines.map((cuisine) => (
              <option>{cuisine}</option>
            ))}
          </select>
        </div>
        <div className="mx-3 bg-yellow" style={{ height: "2px" }}></div>
        <div className="px-4 py-3">
          <div className="row">
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
    </>
  );
};

export default Restaurants;
