import React from "react";
import profileIcon from "../../assets/images/profile_icon.png";
import { useSelector } from "react-redux";

const CustomerDashboardProfile = () => {
  const { auth, details } = useSelector((state) => state.user);
  return (
    <div className="container-fluid bg-white shadow col-12 col-md-6 mx-auto p-2 p-md-4 m-4 rounded">
      <div className="d-flex justify-content-between align-items-center mx-2">
        <h2 className="text-yellow">My Profile</h2>
      </div>
      <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
      {auth && (
        <div className="d-flex flex-column align-items-center text-purple my-4">
          <img src={profileIcon} className="col-6 col-md-3 my-4" />
          <h2 className="fs-1">{details.name}</h2>
          <p className="fw-semibold fs-5">{details.email}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboardProfile;
