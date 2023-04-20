import React from "react";
import { Navbar } from "../components";
import errorImage from "../assets/images/404_notfound.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-grey min-vh-100">
      <Navbar />
      <div className="p-2 h-75">
        <div
          className="container-fluid bg-white shadow w-auto my-4 mx-2 mx-md-4 p-2 p-md-4 rounded d-flex"
          style={{ height: 475 }}
        >
          <div className="m-auto text-center">
            <img src={errorImage} width={360} />
            <p className="fs-3 fw-semibold text-purple">
              Error 404 - Page Not Found
            </p>
            <Link to="/">
              <button className="btn btn-yellow">Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
