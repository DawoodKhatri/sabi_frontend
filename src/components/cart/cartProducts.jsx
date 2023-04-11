import React from "react";
import ProductCard from "../cards/productCard";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

const CartPorducts = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div
      className="container-fluid bg-white shadow w-auto my-4 mx-2 mx-md-4 p-2 p-md-4 rounded"
      style={{ minHeight: 475 }}
    >
      <div className="d-flex justify-content-between align-items-center mx-2">
        <h2 className="text-yellow">My Cart</h2>
        <button
          className="btn btn-purple h-auto my-2"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Empty Cart
        </button>
      </div>
      <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
      <div className="px-1 py-3 px-md-4">
        <div className="row">
          {products.map(({ product }, index) => (
            <div
              key={`restaurant_page_products_card_${index}`}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-3"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPorducts;
