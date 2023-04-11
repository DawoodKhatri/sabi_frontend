import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import httpRequest from "../utils/request";
import emptyCart from "../assets/images/empty_cart.png";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState();

  useEffect(() => {
    httpRequest(`/api/cart`, "GET").then((response) => {
      if (response.success) {
        setCart(response.data);
      }
    });
  }, []);

  if (cart)
    return (
      <>
        <Navbar />
        <div className="p-2 bg-grey h-100">
          <div
            className="container-fluid bg-white shadow w-auto my-4 mx-2 mx-md-4 p-2 p-md-4 rounded d-flex"
            style={{ minHeight: "80%" }}
          >
            <div className="m-auto text-center">
              <img src={emptyCart} width={350} />
              <p className="fs-3 fw-semibold text-purple">Cart is Empty</p>
              <Link to="/">
                <button className="btn btn-yellow">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="p-2 bg-grey h-100">
        <div
          className="container-fluid bg-white shadow w-auto my-4 mx-2 mx-md-4 p-2 p-md-4 rounded"
          style={{ minHeight: "80%" }}
        >
          <h2 className="text-yellow">My Cart</h2>
          <div className="h-100 bg-green">products</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
