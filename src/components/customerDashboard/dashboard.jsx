import React, { useState, useEffect } from "react";
import httpRequest from "../../utils/request";
import BookingCard from "../cards/bookingCard";

const CustomerDashboard = () => {
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
    <div>
      <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
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
      </div>
    </div>
  );
};

export default CustomerDashboard;
