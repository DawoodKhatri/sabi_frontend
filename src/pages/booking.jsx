import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, BookingChefSelection } from "../components";
import { useState } from "react";

const Booking = () => {
  const { auth, details } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && details.isBusiness) {
      navigate("/");
    }
  }, [auth]);

  const [bookingDetails, setBookingDetails] = useState({
    orders: [],
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
      title: "Booking Slot & Table Selection",
      element: <></>,
    },
  ];

  const [currSteps, setCurrSteps] = useState(0);

  const prevStep = () => {
    setCurrSteps(currSteps - 1);
  };

  const nextStep = () => {
    setCurrSteps(currSteps + 1);
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
              className={`btn btn-purple mx-5${currSteps === 0 && " disabled"}`}
              onClick={prevStep}
            >
              <i className="bi bi-arrow-left-circle px-2" />
              Previous
            </button>
            {currSteps !== steps.length - 1 && (
              <button className="btn btn-purple mx-5" onClick={nextStep}>
                Next
                <i className="bi bi-arrow-right-circle px-2" />
              </button>
            )}
            {currSteps === steps.length - 1 && (
              <button className="btn btn-yellow mx-5">
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
