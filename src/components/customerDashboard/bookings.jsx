import React, { useState, useEffect } from "react";
import httpRequest from "../../utils/request";
import BookingCard from "../cards/bookingCard";
import emptyImage from "../../assets/images/empty_cart.png"

const CustomerDashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    httpRequest("/api/bookings/customer", "GET").then((response) => {
      if (response.success) {
        setBookings(response.data.reverse());
      }
    });
  }, [change]);
  return (
    <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
      {bookings.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center mx-2">
            <h2 className="text-yellow">My Bookings</h2>
          </div>
          <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>

          <div className="my-4 accordion" id="bookingCards">
            {bookings.map((booking, index) => (
              <BookingCard
                {...booking}
                key={`dashboard_bookings_card_${index}`}
                type="customer"
                change={change}
                setChange={setChange}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="m-auto my-5 text-center">
            <img src={emptyImage} width={300} />
            <p className="fs-3 fw-semibold text-purple mt-3">No Bookings Done Yet</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDashboardBookings;
