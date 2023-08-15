import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RestaurantDashboardBookings from "./bookings";
import RestaurantDashboardProducts from "./products";
import RestaurantDashboardTables from "./tables";
import RestaurantDashboardDetails from "./details";

const RestaurantDashboard = () => {
  const { id, section: currSection } = useParams();
  const navigate = useNavigate();

  const sections = {
    bookings: {
      text: "Bookings",
      element: <RestaurantDashboardBookings />,
    },
    products: {
      text: "Products",
      element: <RestaurantDashboardProducts />,
    },
    tables: {
      text: "Tables",
      element: <RestaurantDashboardTables />,
    },
    details: {
      text: "Details",
      element: <RestaurantDashboardDetails />,
    },
  };

  useEffect(() => {
    if (!Object.keys(sections).includes(currSection)) {
      navigate(`/dashboard/restaurant/${id}/bookings`);
    }
  }, [currSection]);

  const getSection = () => {
    if (currSection && Object.keys(sections).includes(currSection)) {
      return sections[currSection].element;
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="mx-auto mt-3 p-2 bg-white shadow rounded">
        <ul className="nav nav-pills nav-fill align-items-center">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link py-1 bg-yellow text-white "
            >
              <i className="bi bi-arrow-left fs-5" />
            </Link>
          </li>
          <div className="mx-2" />
          {Object.keys(sections).map((section) => (
            <li className="nav-item">
              <Link
                to={`/dashboard/restaurant/${id}/${section}`}
                className={`nav-link m-0${
                  currSection === section
                    ? " bg-yellow text-white"
                    : " text-purple"
                }`}
              >
                {sections[section].text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {getSection()}
    </div>
  );
};

export default RestaurantDashboard;
