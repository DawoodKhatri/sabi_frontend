import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Navbar,
  RestaurantAbout,
  RestaurantProducts,
  RestaurantSimilar,
} from "../components";

const Restaurant = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div className="p-2 bg-grey">
        <RestaurantAbout id={id} />
        <div className="row mx-md-2">
          <div className="col-12 col-lg-8">
            <RestaurantProducts id={id} />
          </div>
          <div className="col-12 col-lg-4">
            <RestaurantSimilar id={id} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Restaurant;
