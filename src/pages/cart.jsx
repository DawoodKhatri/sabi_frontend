import React, { useEffect, useState } from "react";
import {
  CartEmpty,
  CartPorducts,
  CartSummary,
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
            <div className="row w-100 m-0 px-2 px-md-4 py-2 py-md-4">
              <div className="col-12 col-md-8 p-0 px-0 px-md-4 py-2">
                <CartProducts />
              </div>
              <div className="col-12 col-md-4 p-0 px-0 px-md-4 py-2">
                <CartSummary />
              </div>
            </div>
          </>
        ) : (
          <CartEmpty />
        )}
      </div>
    </div>
  );
};

export default Cart;
