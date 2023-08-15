import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  BookingChefSelection,
  BookingDetailsAndTable,
  BookingConfirmDetails,
} from "../components";
import { useState } from "react";
import httpRequest from "../utils/request";

const Booking = () => {
  const { auth, details } = useSelector((state) => state.user);
  const { restaurant } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && details.isBusiness) {
      navigate("/");
    }
  }, [auth]);

  const [bookingDetails, setBookingDetails] = useState({
    orders: [],
    time_slot: null,
    tables: [],
  });

  const setOrders = (orders) => {
    setBookingDetails({ ...bookingDetails, orders });
  };

  const steps = [
    {
      title: "Chef Preference Selection",
      element: (
        <BookingChefSelection
          orders={bookingDetails.orders}
          setOrders={setOrders}
        />
      ),
    },
    {
      title: "Additional Details & Table Selection",
      element: (
        <BookingDetailsAndTable
          bookingDetails={bookingDetails}
          setBookingDetails={setBookingDetails}
        />
      ),
    },
    {
      title: "Confirm Booking Details",
      element: (
        <BookingConfirmDetails
          bookingDetails={bookingDetails}
          setBookingDetails={setBookingDetails}
        />
      ),
    },
  ];

  const [currSteps, setCurrSteps] = useState(0);

  const validate = (onValid) => {
    switch (currSteps) {
      case 0: {
        if (bookingDetails.orders.filter((order) => !order.chef).length == 0) {
          onValid();
        } else {
          alert("Please Choose Chefs for all Products");
        }
        break;
      }
      case 1: {
        if (!bookingDetails.phone) {
          alert("Please Enter Mobile number");
        } else if (bookingDetails.tables.length === 0) {
          alert("Please Choose a Table");
        } else {
          onValid();
        }
        break;
      }
      default:
        onValid();
    }
  };

  const prevStep = () => {
    setCurrSteps(currSteps - 1);
  };

  const nextStep = () => {
    setCurrSteps(currSteps + 1);
  };

  const confirmBooking = () => {
    httpRequest(
      `/api/booking/createBooking?id=${restaurant._id}`,
      "POST",
      bookingDetails
    ).then(
      ({ success, message }) => {
        alert(message);
        if (success) navigate("/dashboard");
      },
      ({ message }) => {
        alert(message);
      }
    );
  };

  return (
    <div className="bg-grey min-vh-100" draggable>
      <Navbar />
      <div className="p-2">
        <div className="w-100 m-0 px-2 px-md-4 py-2 py-md-4">
          <h2 className="text-yellow text-center">{steps[currSteps].title}</h2>
          <div className="mx-2 mb-4 bg-yellow" style={{ height: "2px" }}></div>
          {steps[currSteps].element}

          <div className="d-flex justify-content-center gap-5 my-5">
            <button
              className={`btn btn-purple${currSteps === 0 ? " disabled" : ""}`}
              onClick={() => validate(prevStep)}
            >
              <i className="bi bi-arrow-left-circle px-2" />
              Previous
            </button>
            {currSteps !== steps.length - 1 && (
              <button
                className="btn btn-purple"
                onClick={() => validate(nextStep)}
              >
                Next
                <i className="bi bi-arrow-right-circle px-2" />
              </button>
            )}
            {currSteps === steps.length - 1 && (
              <button className="btn btn-yellow" onClick={confirmBooking}>
                <i className="bi bi-check-circle px-2" />
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
