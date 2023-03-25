// import Home from "./Components/Home";
// import Signup from "./Components/Signup";
// import Login from "./Components/Login";
// import Dashboard from "./Components/Dashboard";
// import NewBooking from "./Components/Customer/NewBooking";
// import RestaurantsPage from "./Components/RestaurantsPage";

import { Navbar } from "./components";
import { Dashboard, Home, Login, Restaurants, Signup } from "./pages";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./redux/slices/userSlice";

export default function App() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(data);
    // dispatch(
    //   userLogin({ email: "dawoodkhatri18@gmail.com", password: "DK@SABI" })
    // );
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* <Route path="/signup" element={<Signup update={setData} />} />
        <Route path="/login" element={<Login update={setData} />} />
        <Route
          path="/dashboard"
          element={<Dashboard userData={userData} setData={setData} />}
        />
        {userData && userData.type === "customer" && (
          <Route
            path="/dashboard/newbooking"
            element={<NewBooking id={userData._id.toString()} />}
          />
        )}
        <Route path="/restaurant/:id" element={<RestaurantsPage />} />
        <Route path="*" element={<>404</>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
