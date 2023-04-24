import React, { useState, useEffect } from "react";
import httpRequest from "../../utils/request";
import BookingCard from "../cards/bookingCard";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [change, setChange] = useState(false);

  const updateRestaurants = async (restaurantData) => {
    let tempRestaurants = Array.from(restaurantData);
    let i = restaurantData.length;
    tempRestaurants.forEach(async (restaurant) => {
      let bookings = (
        await httpRequest(`/api/bookings/restaurant/${restaurant._id}`, "GET")
      ).data;

      tempRestaurants[tempRestaurants.indexOf(restaurant)] = {
        ...restaurant,
        bookings,
      };

      i -= 1;

      if (i === 0) {
        setRestaurants(tempRestaurants);
      }
    });
  };

  useEffect(() => {
    httpRequest("/api/user/restaurants", "GET").then((response) => {
      if (response.success) {
        updateRestaurants(response.data);
      }
    });
  }, [change]);

  return (
    <div>
      <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
        <div className="d-flex justify-content-between align-items-center mx-2">
          <h2 className="text-yellow">My Bookings</h2>
        </div>
        <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
        <div className="my-4 accordion" id="bookingCards">
          {restaurants.map(({ bookings }, index) =>
            bookings.map((booking) => (
              <BookingCard
                {...booking}
                key={`dashboard_bookings_card_${index}`}
                type="restaurant"
                change={change}
                setChange={setChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
