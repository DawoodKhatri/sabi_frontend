import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../utils/request";
import { ChefCard } from "../index";

const HomeChefs = () => {
  const [chefs, setChefs] = useState([]);
  useEffect(() => {
    httpRequest("/api/chefs", "GET").then((response) => {
      if (response.success) {
        setChefs(response.data);
      }
    });
  }, []);
  return (
    <div className="px-3 py-2">
      <div className="d-flex justify-content-between px-4">
        <p className="mx-3 my-auto text-yellow fw-semibold fs-3">
          Our Top Chefs
        </p>
        {/* <Link
          to="/chefs"
          className="mx-3 my-auto text-dark text-decoration-none"
        >
          See More
        </Link> */}
      </div>
      <div className="mx-3 bg-yellow" style={{ height: "2px" }}></div>
      <div className="px-4 py-3">
        <div
          className="row flex-row flex-nowrap"
          style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          {chefs.map((chef, index) => (
            <div
              key={`home_page_chefs_card_${index}`}
              className="col-6 col-sm-4 col-md-3 col-lg-2 p-3"
            >
              <ChefCard {...chef} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeChefs;
