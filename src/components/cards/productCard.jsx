import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FOOD_TYPES } from "../../constants/common.constants";
import vegDot from "../../assets/svg/vegDot.svg";
import nonVegDot from "../../assets/svg/nonVegDot.svg";
import styles from "../../styles/cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  reduceFromCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const ProductCard = ({
  _id,
  thumbnail,
  name,
  type,
  cuisine,
  rating: { $numberDecimal: rating },
  reviews,
  tag,
}) => {
  const { auth, details } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart) {
      const products = cart.products;

      setQuantity(
        products.filter(({ product }) => product._id === _id)[0]?.quantity
      );
    } else {
      setQuantity(null);
    }
  }, [cart]);

  return (
    // <Link to={`/restaurant/${_id}`} className="text-dark text-decoration-none">
    <div
      className={`${styles.card} h-auto m-1 rounded rounded-4 overflow-hidden`}
    >
      <div className="position-relative">
        <div className="position-absolute end-0 p-2">
          {type === FOOD_TYPES.veg.value ? (
            <img src={vegDot} className="bg-white shadow" />
          ) : (
            <img src={nonVegDot} className="bg-white shadow" />
          )}
        </div>
        <img
          className={`${styles.thumbnail} w-100 mh-50`}
          src={thumbnail.url}
          alt={thumbnail.fileName}
        />
      </div>

      <div className="px-2 mx-1 my-2">
        <p className="m-0 d-flex  justify-content-between align-items-center">
          <span className="col-6 text-truncate fw-bold" title={name}>
            {name}
          </span>
          <span
            className={`${styles.tag} text-truncate bg-orange text-white px-1 rounded-1`}
          >
            {tag}
          </span>
        </p>
        <p className="m-0 d-flex justify-content-between">
          <span className="text-warning">
            {Array.apply(null, { length: 5 }).map((_, i) => {
              if (rating - i <= 0) {
                return <i className="bi bi-star" key={`$rating_star_${i}`}></i>;
              } else if (rating - i < 1) {
                return (
                  <i className="bi bi-star-half" key={`$rating_star_${i}`}></i>
                );
              } else {
                return (
                  <i className="bi bi-star-fill" key={`$rating_star_${i}`}></i>
                );
              }
            })}
          </span>
          <span>({reviews.length} reviews)</span>
        </p>
        <p className="m-0 d-flex align-items-center">
          <span className="col-4 text-truncate" title={cuisine}>
            {cuisine}
          </span>
          {auth && !details.isBusiness && (
            <span className={`${styles.button} col-8 text-end`}>
              {quantity > 0 ? (
                <>
                  <button
                    className="btn btn-sm btn-green text-white px-1 py-0 mx-1"
                    onClick={() => {
                      dispatch(addToCart(_id));
                    }}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <button className="btn btn-sm border border-yellow px-1 py-0 mx-1">
                    {quantity}
                  </button>
                  <button
                    className="btn btn-sm btn-orange text-white px-1 py-0 mx-1"
                    onClick={() => {
                      dispatch(reduceFromCart(_id));
                    }}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-red px-1 py-0 mx-1"
                    onClick={() => {
                      dispatch(removeFromCart(_id));
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm btn-purple px-1 py-0"
                  onClick={() => {
                    dispatch(addToCart(_id));
                  }}
                >
                  Add to Cart
                </button>
              )}
            </span>
          )}
        </p>
      </div>
    </div>
    // </Link>
  );
};

export default ProductCard;
