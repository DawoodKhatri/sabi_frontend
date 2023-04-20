import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { auth, details } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && details.isBusiness) {
      navigate("/");
    }
  }, [auth]);

  return <div>Booking</div>;
};

export default Booking;
