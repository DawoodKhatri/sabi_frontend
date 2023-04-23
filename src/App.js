// import Home from "./Components/Home";
// import Signup from "./Components/Signup";
// import Login from "./Components/Login";
// import Dashboard from "./Components/Dashboard";
// import NewBooking from "./Components/Customer/NewBooking";
// import RestaurantsPage from "./Components/RestaurantsPage";

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

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/booking" element={<Booking />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
