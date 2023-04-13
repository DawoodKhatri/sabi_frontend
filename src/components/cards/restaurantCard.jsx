import React from "react";
import { Link } from "react-router-dom";
import { FOOD_TYPES } from "../../constants/common.constants";
import styles from "../../styles/cards.module.css";

const RestaurantCard = ({
  _id,
  thumbnail,
  name,
  type,
  rating: { $numberDecimal: rating },
  reviews,
  cuisines,
}) => {
  return (
    <Link to={`/restaurant/${_id}`} className="text-dark text-decoration-none">
      <div
        className={`${styles.card} h-auto m-1 rounded rounded-4 overflow-hidden`}
      >
        <img
          className={`${styles.thumbnail} w-100 mh-50`}
          src={thumbnail.url}
          alt={thumbnail.fileName}
        />
        <div className="px-2 mx-1 my-2">
          <p className="m-0 d-flex  justify-content-between">
            <span className="col-8 text-truncate fw-bold" title={name}>
              {name}
            </span>
            <span
              className="text-truncate"
              title={
                Object.values(FOOD_TYPES).filter(
                  (food_type) => food_type.value === type
                )[0].label
              }
            >
              {
                Object.values(FOOD_TYPES).filter(
                  (food_type) => food_type.value === type
                )[0].label
              }
            </span>
          </p>
          <p className="m-0 d-flex justify-content-between">
            <span className="text-yellow fs-6">
              {Array.apply(null, { length: 5 }).map((_, i) => {
                if (rating - i <= 0) {
                  return (
                    <i className="bi bi-star" key={`$rating_star_${i}`}></i>
                  );
                } else if (rating - i < 1) {
                  return (
                    <i
                      className="bi bi-star-half"
                      key={`$rating_star_${i}`}
                    ></i>
                  );
                } else {
                  return (
                    <i
                      className="bi bi-star-fill"
                      key={`$rating_star_${i}`}
                    ></i>
                  );
                }
              })}
            </span>
            <span>({reviews.length} reviews)</span>
          </p>
          <p className="m-0 text-truncate">
            {cuisines.map((cuisine, i) => {
              if (i === 0) {
                return cuisine;
              } else return ", " + cuisine;
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
