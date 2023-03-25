import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import httpRequest from "../utils/request";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.auth) {
      navigate("/");
    }
  }, [user]);
  return <div>{user.auth && JSON.stringify(user.details)}</div>;
};

export default Dashboard;
