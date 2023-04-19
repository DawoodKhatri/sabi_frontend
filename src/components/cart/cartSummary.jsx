import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CartSummary = () => {
  const { restaurant, products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    let total = 0;
    products.forEach(({ product: { price }, quantity }) => {
      total += price * quantity;
    });
    return total;
  };

  return (
    <div
      className="container-fluid bg-white shadow w-auto p-2 p-md-4 rounded h-100"
      style={{ minHeight: 475 }}
    >
      <div className="d-flex justify-content-between align-items-center mx-2 mt-1">
        <h2 className="text-yellow">Summary</h2>
      </div>
      <div className="mx-2 bg-yellow mb-3" style={{ height: "2px" }}></div>
      <h3 className="text-center text-orange">{restaurant.name}</h3>
      <p className="text-center text-green">{restaurant.description}</p>
      <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
      <div className="px-1 py-3 px-md-4 d-flex flex-column">
        <table class="table table-borderless text-purple">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col text-center">Quantity</th>
              <th scope="col text-end">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ product: { name, price }, quantity }) => (
              <tr>
                <td>{name}</td>
                <td className="text-center">{quantity}</td>
                <td className="text-end">₹{price * quantity}</td>
              </tr>
            ))}
            <tr>
              <th>Total</th>
              <th className="text-center"></th>
              <th className="text-end">₹{getTotal()}</th>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-purple h-auto mx-auto my-auto"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
