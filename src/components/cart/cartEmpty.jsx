import React from "react";
import emptyCart from "../../assets/images/empty_cart.png";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div
      className="container-fluid bg-white shadow w-auto my-4 mx-2 mx-md-4 p-2 p-md-4 rounded d-flex"
      style={{ height: 475 }}
    >
      <div className="m-auto text-center">
        <img src={emptyCart} width={300} />
        <p className="fs-3 fw-semibold text-purple">Cart is Empty</p>
        <Link to="/">
          <button className="btn btn-yellow">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
