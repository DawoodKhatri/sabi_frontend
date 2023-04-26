// import Home from "./Components/Home";
// import Signup from "./Components/Signup";
// import Login from "./Components/Login";
// import Dashboard from "./Components/Dashboard";
// import NewBooking from "./Components/Customer/NewBooking";
// import RestaurantsPage from "./Components/RestaurantsPage";

import { useSelector } from "react-redux";
import {
  Booking,
  Cart,
  Dashboard,
  Home,
  Login,
  PageNotFound,
  Restaurant,
  Restaurants,
  Signup,
} from "./pages";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  CustomerDashboard,
  RestaurantDashboard,
  RestaurantDashboardBookings,
  RestaurantDashboardRestaurants,
} from "./components";

export default function App() {
  const { auth, details } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<Restaurant />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {auth && !details.isBusiness && (
        <>
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/booking" element={<Booking />} />
        </>
      )}
      {auth && details.isBusiness ? (
        <Route element={<Dashboard />}>
          <Route
            path="/dashboard"
            element={<RestaurantDashboardRestaurants />}
          />
          <Route
            path="/dashboard/restaurant/:id/:section"
            element={<RestaurantDashboard />}
          />
        </Route>
      ) : (
        <Route element={<Dashboard />}>
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/dashboard/:section" element={<CustomerDashboard />} />
        </Route>
      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
