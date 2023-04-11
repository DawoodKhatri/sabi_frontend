import React, { useEffect, useState } from "react";
import {
  CartEmpty,
  CartPorducts,
  Navbar,
  RestaurantAbout,
} from "../components";
import httpRequest from "../utils/request";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="bg-grey min-vh-100">
      <Navbar />
      <div className="p-2 h-75">
        {cart ? (
          <>
            {/* <RestaurantAbout id={cart.restaurant._id} /> */}
            <CartPorducts />
          </>
        ) : (
          <CartEmpty />
        )}
      </div>
    </div>
  );
};

export default Cart;
