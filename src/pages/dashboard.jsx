import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, CustomerDashboard, RestaurantDashboard } from "../components";

const Dashboard = () => {
  const { auth, details } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  if (!auth) return <></>;
  return (
    <div className="bg-grey min-vh-100">
      <Navbar />
      <div className="p-2">
        <Outlet/>
        {/* {details.isBusiness ? <RestaurantDashboard /> : <CustomerDashboard />} */}
      </div>
    </div>
  );
};

export default Dashboard;
