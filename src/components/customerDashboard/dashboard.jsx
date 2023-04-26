import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerDashboardBookings from "./bookings";
import CustomerDashboardProfile from "./profile";

const CustomerDashboaard = () => {
  const { id, section: currSection } = useParams();
  const navigate = useNavigate();

  const sections = {
    bookings: {
      text: "Bookings",
      element: <CustomerDashboardBookings />,
    },
    products: {
      text: "Profile",
      element: <CustomerDashboardProfile />,
    },
  };

  useEffect(() => {
    if (!currSection || !Object.keys(sections).includes(currSection)) {
      navigate(`/dashboard/bookings`);
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
          {Object.keys(sections).map((section) => (
            <li className="nav-item">
              <Link
                to={`/dashboard/${section}`}
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

export default CustomerDashboaard;
