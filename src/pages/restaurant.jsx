import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, RestaurantAbout, RestaurantProducts } from "../components";

const Restaurant = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div className="p-2 bg-grey">
        <RestaurantAbout id={id} />
        <RestaurantProducts id={id} />
      </div>
    </>
  );
};
export default Restaurant;
