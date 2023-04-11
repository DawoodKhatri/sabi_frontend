import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import AddRestaurantForm from "../components/forms/addRestaurantForm";
import httpRequest from "../utils/request";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.auth) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      {user.auth && (
        <>
          <Navbar />
          {user.details.isBusiness && (
            <div
              className="container-fluid p-2 d-flex"
              style={{ backgroundColor: "#eee" }}
            >
              <div className="w-75 p-5 m-auto">
                <AddRestaurantForm />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
